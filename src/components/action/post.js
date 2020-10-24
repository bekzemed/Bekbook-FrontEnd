import axios from "axios";
import {
  GET_POSTS,
  GET_MY_POSTS,
  GET_ERRORS,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
} from "./types";

export const getPost = () => (dispatch) => {
  axios
    .get("/api/post")
    .then((res) =>
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const getMyPost = () => (dispatch) => {
  axios
    .get("/api/post/my")
    .then((res) =>
      dispatch({
        type: GET_MY_POSTS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const addPost = (userData, history) => (dispatch) => {
  axios
    .post("/api/post", userData)
    .then(() => history.push("/posts"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const deletePost = (id) => (dispatch) => {
  axios
    .delete(`/api/post/${id}`)
    .then(() =>
      dispatch({
        type: DELETE_POST,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const updateLike = (id) => (dispatch) => {
  axios
    .post(`/api/post/updateLike/${id}`)
    .then((res) =>
      dispatch({
        type: UPDATE_LIKES,
        payload: { id, likes: res.data.likes },
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,

        payload: err.response.data,
      })
    );
};

export const addComment = (postId, formData) => (dispatch) => {
  axios
    .post(`/api/post/comment/${postId}`, formData)
    .then((res) =>
      dispatch({
        type: ADD_COMMENT,
        payload: { postId, comments: res.data.comments },
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const deleteComment = (postId, commentId) => (dispatch) => {
  axios
    .post(`/api/post/comment/${postId}/${commentId}`)
    .then((res) =>
      dispatch({
        type: DELETE_COMMENT,
        payload: commentId,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
