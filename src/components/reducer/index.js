import { combineReducers } from "redux";
import authReducer from "./auth";
import errorReducer from "./error";
import profileReducer from "./profile";
import postsReducer from "./post";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  posts: postsReducer,
});
