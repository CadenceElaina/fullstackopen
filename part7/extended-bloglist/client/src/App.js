import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Users from "./components/Users";

import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Togglable";

//import { createBlog } from "../reducers/blogReducer";
import { loggedUser, logUserOut } from "./reducers/loginReducer";
import { initializeUsers } from "./reducers/userReducer";
import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import BlogList from "./components/BlogList";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loggedUser());
    dispatch(initializeUsers());
    dispatch(initializeBlogs());
  }, [dispatch]);

  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.login);
  const users = useSelector((state) => state.users);

  const handleLogout = () => {
    dispatch(logUserOut());
    dispatch(setNotification(`${user.name} has been logged out!`, 5));
  };

  return (
    <div>
      <h1 className="header-title">Blogs</h1>
      <Notification />
      {user === null ? (
        <Togglable buttonLabel="login">
          <LoginForm />
        </Togglable>
      ) : (
        <div>
          <div>
            <span className="active-user">{user.name}</span> logged in{" "}
            <button id="logout-btn" onClick={handleLogout}>
              logout
            </button>
            <Users />
          </div>
          <BlogList />
        </div>
      )}
    </div>
  );
};

export default App;
