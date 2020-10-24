import axios from "axios";
import {
  GET_PROFILE,
  GET_PROFILES,
  GET_ALL_PROFILES,
  GET_ERRORS,
  SET_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_PROFILE_BY_HANDLE,
} from "./types";

export const getCurrentProfile = () => (dispatch) => {
  dispatch(startLoading());
  axios
    .get("/api/profile")
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
    )
    .catch(() =>
      dispatch({
        type: GET_PROFILE,
        payload: {},
      })
    );
};

export const getAllProfiles = () => (dispatch) => {
  dispatch(startLoading());
  axios
    .get("/api/profile/all")
    .then((res) =>
      dispatch({
        type: GET_ALL_PROFILES,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ALL_PROFILES,
        payload: [],
      })
    );
};

export const getOtherProfiles = () => (dispatch) => {
  dispatch(startLoading());
  axios
    .get("/api/profile/other")
    .then((res) =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data,
      })
    )
    .catch(() =>
      dispatch({
        type: GET_PROFILES,
        payload: [],
      })
    );
};

export const createProfile = (userData, history) => (dispatch) => {
  axios
    .post("/api/profile", userData)
    .then(() => history.push("/posts"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const getProfileByHandle = (handle) => (dispatch) => {
  dispatch(startLoading);
  axios
    .get(`/api/profile/handle/${handle}`)
    .then((res) =>
      dispatch({
        type: GET_PROFILE_BY_HANDLE,
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

export const addEducation = (userData, history) => (dispatch) => {
  axios
    .post("/api/profile/education", userData)
    .then(() => history.push("/posts"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const addLocation = (userData, history) => (dispatch) => {
  axios
    .post("/api/profile/location", userData)
    .then(() => history.push("/posts"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const deleteEducation = (id) => (dispatch) => {
  axios
    .delete(`/api/profile/education/${id}`)
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
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

export const deleteLocation = (id) => (dispatch) => {
  axios
    .delete(`/api/profile/location/${id}`)
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
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

export const sendFriendRequest = (id) => (dispatch) => {
  axios
    .post(`/api/profile/friendRequest/${id}`)
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
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

export const deleteFriendRequest = (id) => (dispatch) => {
  axios
    .delete(`/api/profile/friendRequest/${id}`)
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
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

export const startLoading = () => (dispatch) => {
  dispatch({
    type: SET_LOADING,
  });
};

// clear current profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};
