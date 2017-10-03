import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styles from './Post.css';
import actions from '../../actions';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.initialFetch();
  }

  async initialFetch() {
    console.log(this.props.user);
    if (this.props.user && this.props.comments.size > 0) {
      return this.setState({
        loading: false,
      });
    }

    console.log('calling actions');
    await Promise.all([
      this.props.actions.loadUser(this.props.userId),
      this.props.actions.loadCommentsForPost(this.props.id),
    ]);

    return this.setState({
      loading: false,
    });
  }

  render() {
    return (
      <article id={`post-${this.props.id}`} className={styles.post}>
        <h2 className={styles.title}>
          <Link to={`/posts/${this.props.id}`}>
            {this.props.title}
          </Link>
        </h2>
        <p className={styles.body}>{this.props.body}</p>

        {!this.state.loading && (
          <div className={styles.meta}>
            <Link to={`/users/${this.props.user.get('id')}`} className={styles.user}>
              {this.props.user.get('name')}
            </Link>
            <span className={styles.comments}>
              <FormattedMessage
                id="post.meta.comments"
                values={{
                  amount: this.props.comments.size,
                }}
              />
            </span>
            <Link to={`/posts/${this.props.id}`}>
              <FormattedMessage id="post.meta.readMore" />
            </Link>
          </div>
        )}
      </article>
    );
  }
}

Post.propTypes = {
  id: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    size: PropTypes.number,
    get: PropTypes.func,
  }),
  comments: PropTypes.instanceOf(Map),
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
};

Post.defaultProps = {
  user: null,
  comments: null,
};

const mapStateToProps = (state, props) => ({
  comments: state
    .get('comments')
    .filter(comment => comment.get('postId') === props.id),
  user: state
    .get('users')
    .get(props.userId),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
