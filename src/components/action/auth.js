import axios from "axios";
import { GET_ERRORS, GET_USER, GET_USERS, SET_LOADING } from "./types";
import setToken from "../common/setToken";
import jwtDecode from "jwt-decode";

export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/api/users/register", userData)
    .then(() => history.push("/login"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const loginUser = (newData) => (dispatch) => {
  axios
    .post("/api/users/login", newData)
    .then((res) => {
      // get token
      const { token } = res.data;
      // save to local storage
      localStorage.setItem("jwtToken", token);
      // set token to authorization token
      setToken(token);
      // decode the token
      const decoded = jwtDecode(token);
      // dispatch
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const setCurrentUser = (decoded) => {
  return {
    type: GET_USER,
    payload: decoded,
  };
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setToken(false);
  dispatch(setCurrentUser({}));
};
export const startLoading = () => (dispatch) => {
  dispatch({
    type: SET_LOADING,
  });
};

export const getAllUser = () => (dispatch) => {
  axios
    .get("/api/users/all")
    .then((res) => dispatch({ type: GET_USERS, payload: res.data }))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
