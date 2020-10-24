import {
  GET_POSTS,
  GET_MY_POSTS,
  // ADD_POST,
  DELETE_POST,
  UPDATE_LIKES,
  ADD_COMMENT,
  DELETE_COMMENT,
} from "../action/types";

const initialState = {
  post: null,
  posts: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case GET_MY_POSTS:
      return {
        ...state,
        post: action.payload,
      };
    // case ADD_POST:
    //   return {
    //     ...state,
    //     posts: [action.payload, ...state.posts],
    //   };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.id
            ? { ...post, likes: action.payload.likes }
            : post
        ),
      };
    case ADD_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.postId
            ? { ...post, comments: action.payload.comments }
            : post
        ),
      };
    case DELETE_COMMENT:
      return {
        ...state,
        posts: state.posts.comments.filter(
          (comment) => comment._id !== action.payload
        ),
      };
    default:
      return state;
  }
}
