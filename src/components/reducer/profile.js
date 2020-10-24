import {
  GET_PROFILE,
  CLEAR_CURRENT_PROFILE,
  SET_LOADING,
  GET_PROFILE_BY_HANDLE,
  GET_PROFILES,
} from "../action/types";

const initialState = {
  profile: null,
  profiles: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false,
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_PROFILE_BY_HANDLE:
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
