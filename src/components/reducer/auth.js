import { GET_USER, GET_USERS, SET_LOADING } from "../action/types";
import isEmpty from "../validator/isEmpty";

const initialState = {
  isAuthenticated: false,
  user: {},
  users: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };

    case GET_USERS:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        users: action.payload,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
