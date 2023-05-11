import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, useMatch } from "react-router-dom";

import { Container } from "@mui/material";

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Users from "./components/Users";
import User from "./components/User";
import Navbar from "./components/Navbar";

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
  //const users = useSelector((state) => state.users);

  const match = useMatch("/blogs/:id");
  const blogId = match
    ? blogs.find((blog) => blog.id === match.params.id)
    : null;
  /*   console.log(blogId); */
  return (
    <Container>
      <div>
        <h1 className="header-title">Blogs</h1>
        <Notification />
        {user === null ? (
          <Togglable buttonLabel="login">
            <LoginForm />
          </Togglable>
        ) : (
          <div>
            <Navbar />
            <Routes>
              <Route path="/" element={<BlogList />} />
              <Route path="/blogs/:id" element={<Blog />} />
              <Route path="/blogs" element={<BlogList blogs={blogs} />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<User />} />
              {/*  <Route path="/" element={<Home />} /> */}
            </Routes>
          </div>
        )}
      </div>
    </Container>
  );
};

export default App;
