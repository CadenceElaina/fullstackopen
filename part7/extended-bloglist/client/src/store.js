import { configureStore } from "@reduxjs/toolkit";
import blogsReducer, { setBlogs } from "./reducers/blogReducer";
//import filterReducer from './reducers/filterReducer'
import notificationReducer from "./reducers/notificationReducer";
import userReducer from "./reducers/userReducer";
import loginReducer from "./reducers/loginReducer";

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    //filter: filterReducer,
    notification: notificationReducer,
    users: userReducer,
    login: loginReducer,
  },
});

export default store;
