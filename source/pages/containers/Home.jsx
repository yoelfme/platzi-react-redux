import React, { Component } from 'react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Post from '../../posts/containers/Post';
import Loading from '../../shared/components/Loading';

import styles from './Page.css';
import actions from '../../actions';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.initialFetch();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  async initialFetch() {
    await this.props.actions.postsNextPage();

    this.setState({ loading: false });

    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (this.state.loading) return null;

    const scrolled = window.scrollY;
    const viewportHeight = window.innerHeight;
    const fullHeight = document.documentElement.clientHeight;

    if (!(scrolled + viewportHeight + 300 >= fullHeight)) {
      return null;
    }

    return this.setState({ loading: true }, async () => {
      try {
        await this.props.actions.postsNextPage();

        this.setState({ loading: false });
      } catch (error) {
        console.error(error);
        this.setState({ loading: false });
      }
    });
  }

  render() {
    return (
      <section name="home" className={styles.section}>
        <section className={styles.list}>
          {this.state.loading && (
            <Loading />
          )}

          {this.props.posts
            .map(post => <Post key={post.get('id')} {...post.toJS()} />)
            .toArray()
          }
        </section>
      </section>
    );
  }
}

Home.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  // posts: PropTypes.objectOf(PropTypes.object).isRequired,
  posts: PropTypes.instanceOf(Map).isRequired,
  page: PropTypes.number,
};

Home.defaultProps = {
  page: 1,
};

const mapStateToProps = state => ({
  posts: state
    .get('posts')
    .get('entities'),
  page: state
    .get('posts')
    .get('page'),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
