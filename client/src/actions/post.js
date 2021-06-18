import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "./types";

//Get posts

export const getPosts = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/posts`);
      dispatch({
        type: GET_POSTS,
        playload: res.data,
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        playload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

//Get post

export const getPost = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/posts/${id}`);
      dispatch({
        type: GET_POST,
        playload: res.data,
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        playload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

//Update Likes

export const addLike = (_id) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`/api/posts/like/${_id}`);
      dispatch({
        type: UPDATE_LIKES,
        playload: { id: _id, likes: res.data },
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        playload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

export const removeLike = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`/api/posts/unlike/${id}`);
      dispatch({
        type: UPDATE_LIKES,
        playload: { id, likes: res.data },
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        playload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

//Delete Post

export const deletePost = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/posts/${id}`);
      dispatch({
        type: DELETE_POST,
        playload: id,
      });
      dispatch(setAlert("Post Removed", "success"));
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        playload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

//Add Post
export const addPost = (formData) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(`/api/posts`, formData, config);
      dispatch({
        type: ADD_POST,
        playload: res.data,
      });
      dispatch(setAlert("Post Created", "success"));
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        playload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

//Add Comment

export const addComment = (postId, formData) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        `/api/posts/comment/${postId}`,
        formData,
        config
      );
      dispatch({
        type: ADD_COMMENT,
        playload: res.data,
      });
      dispatch(setAlert("Comment Added", "success"));
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        playload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

//Remove Comment

export const removeComment = (postId, comm_id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/posts/comment/${postId}/${comm_id}`);
      dispatch({
        type: REMOVE_COMMENT,
        playload: comm_id,
      });
      dispatch(setAlert("Comment Removed", "success"));
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        playload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};
