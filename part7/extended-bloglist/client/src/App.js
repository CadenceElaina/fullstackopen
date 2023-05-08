import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";

import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Togglable";

//import { createBlog } from "../reducers/blogReducer";
import { useSelector, useDispatch } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";

const App = () => {
  const blogFormRef = useRef();
  const dispatch = useDispatch();
  //const blogs = useSelector(state => state);
  //const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  /* useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []); */

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const blogs = useSelector((state) => state.blogs);
  console.log(blogs);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      dispatch(setNotification(`${user.name} successfully logged in!`, 5));
    } catch (exception) {
      dispatch(setNotification(`error: Wrong credentials`, 5));
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
    dispatch(setNotification(`${user.name} has been logged out!`, 5));
  };

  /*   const createBlog = async (title, author, url) => {
    try {
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
    }
  }; */

  /*   const updateLikes = async (id, updatedBlog) => {
    try {
      const response = await blogService.update(id, updatedBlog);

      setBlogs(
        blogs.map((blog) => (blog.id === response.id ? response : blog))
      );
    } catch (exception) {
      dispatch(setNotification(`error ${exception.response.data.error}`, 5));
    }
  }; */

  /*   const removeBlog = async (blogId) => {
    try {
      console.log(blogId);
      const blogToRemove = blogs.filter((blog) => blog.id === blogId);
      const blogToRemoveAuthor = blogToRemove[0].author;
      const blogToRemoveTitle = blogToRemove[0].title;
      console.log(blogToRemove);
      await blogService.remove(blogId);
      const updatedBlogs = blogs.filter((blog) => blog.id !== blogId);
      setBlogs(updatedBlogs);
      dispatch(
        setNotification(
          `${blogToRemoveTitle} by ${blogToRemoveAuthor} removed`,
          5
        )
      );
    } catch (exception) {
      dispatch(setNotification(`error ${exception.response.data.error}`, 5));
    }
  };
 */
  return (
    <div>
      <h1 className="header-title">Blogs</h1>
      <Notification />
      {user === null ? (
        <Togglable buttonLabel="login">
          <LoginForm handleLogin={handleLogin} />
        </Togglable>
      ) : (
        <div>
          <p>
            <span className="active-user">{user.name}</span> logged in{" "}
            <button id="logout-btn" onClick={handleLogout}>
              logout
            </button>
          </p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm togglableRef={blogFormRef} />
          </Togglable>
          <div className="blogs">
            {[...blogs]
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <Blog key={blog.id} blog={blog} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
