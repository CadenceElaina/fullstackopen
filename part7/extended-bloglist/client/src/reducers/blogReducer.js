import { createSlice } from "@reduxjs/toolkit";
import { setNotification } from "./notificationReducer";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      console.log(blog);
      const newBlog = await blogService.create(blog);
      dispatch(appendBlog(newBlog));
      dispatch(setNotification(`${blog.title} by ${blog.author} added`, 5));
    } catch (error) {
      console.log(error.response.data.error);
      dispatch(setNotification(`error ${error.response.data.error}`, 5));
    }
  };
  /*  try {
    blogFormRef.current.toggleVisibility();
    const blog = await blogService.create({
      title,
      author,
      url,
    });
    setBlogs(blogs.concat(blog));
    dispatch(setNotification(`A new blog ${title} by ${author} added`, 5));
  } catch (exception) {
    dispatch(setNotification(`error ${exception.response.data.error}`, 5));
  } */
};

export const { appendBlog, setBlogs } = blogSlice.actions;

export default blogSlice;
