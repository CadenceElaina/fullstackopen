import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";

import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Togglable";

//import { createBlog } from "../reducers/blogReducer";
import { loggedUser, logUserOut } from "./reducers/loginReducer";
import { initializeUsers } from "./reducers/userReducer";
import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";

const App = () => {
  const blogFormRef = useRef();
  const dispatch = useDispatch();
  //const [user, setUser] = useState(null);

  /* useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []); */

  useEffect(() => {
    console.log("useEffect runs");
    dispatch(loggedUser());
    dispatch(initializeUsers());
    dispatch(initializeBlogs());
  }, [dispatch]);

  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.login);
  console.log(user);
  const users = useSelector((state) => state.users);
  console.log(blogs);

  /*   useEffect(() => {
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
  }; */
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
