import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "../actions/types";

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export const post = (state = initialState, action) => {
  const { type, playload } = action;
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: playload,
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: playload,
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: playload,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === playload.id ? { ...post, likes: playload.likes } : post
        ),
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== playload),
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        post: [playload, ...state.posts],
        loading: false,
      };

    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: playload },
        loading: false,
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== playload
          ),
        },
        loading: false,
      };
    default:
      return state;
  }
};
