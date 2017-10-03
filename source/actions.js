import api from './api';

const setPosts = post => ({
  type: 'SET_POSTS',
  payload: post,
});

const setComments = comments => ({
  type: 'SET_COMMENTS',
  payload: comments,
});

const setUser = user => ({
  type: 'SET_USER',
  payload: user,
});

const postsNextPage = () => async (dispatch, getState) => {
  const state = getState();
  const currentPage = state.get('posts').get('page');
  const posts = await api.posts.getList(currentPage);

  dispatch(
    setPosts(posts),
  );

  return posts;
};

const loadCommentsForPost = postId => async (dispatch) => {
  console.debug('loading comments for post id:', postId);
  const comments = await api.posts.getComments(postId);
  dispatch(
    setComments(comments),
  );

  return comments;
};

const loadUser = userId => async (dispatch) => {
  console.debug('loading data userIds :', userId);
  const user = await api.users.getSingle(userId);

  dispatch(
    setUser(user),
  );

  return user;
};

export default {
  postsNextPage,
  loadCommentsForPost,
  loadUser,
  setPosts,
  setComments,
  setUser,
};
