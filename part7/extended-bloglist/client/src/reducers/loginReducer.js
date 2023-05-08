import { createSlice } from "@reduxjs/toolkit";
import { setNotification } from "./notificationReducer";

import blogService from "../services/blogs";
import userService from "../services/users";
import loginService from "../services/login";

const loginSlice = createSlice({
  name: "login",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    login(state, action) {
      return action.payload;
    },
    logout(state, action) {
      return action.payload;
    },
  },
});

export const { setUser, login, logout } = loginSlice.actions;

export const loggedUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      dispatch(setUser(user));
    }
  };
};

export const logUserIn = (user) => {
  return async (dispatch) => {
    const { username, password } = user;
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(login(user));
      dispatch(setNotification(`Welcome ${user.name}!`, 5));
    } catch (error) {
      dispatch(setNotification(`error ${error.response.data.error}`, 5));
    }
  };
};

export const logUserOut = () => {
  return async (dispatch) => {
    window.localStorage.clear();
    dispatch(logout(null));
  };
};

export default loginSlice.reducer;
