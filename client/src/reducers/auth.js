import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED,
  STUDENT_LOADED,
  FACULTY_LOADED,
  PARENT_LOADED,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: localStorage.getItem("token") ? true : null,
  loading: localStorage.getItem("token") ? false : true,
  user: localStorage.getItem("user"),
};

console.log("token", localStorage.getItem("token"));
console.log("user", localStorage.getItem("user"));

export default function (state = initialState, action) {
  const { type, payload } = action;
  console.log("paylaod", payload);
  switch (type) {
    case STUDENT_LOADED:
      localStorage.setItem("user", payload);
      return {
        ...state,
        isAuthenticated: "student",
        loading: false,
        user: payload,
      };
    case FACULTY_LOADED:
      console.log(payload);
      localStorage.setItem("user", payload);
      return {
        ...state,
        isAuthenticated: "faculty",
        loading: false,
        user: payload,
      };
    case PARENT_LOADED:
      localStorage.setItem("user", payload);
      return {
        ...state,
        isAuthenticated: "parent",
        loading: false,
        user: payload,
      };
    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };

    case LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}
