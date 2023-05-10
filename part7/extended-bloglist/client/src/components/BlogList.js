import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "../reducers/blogReducer";

import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import { Link } from "react-router-dom";

const BlogList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    initializeBlogs();
  }, [dispatch]);

  const blogs = useSelector((state) => state.blogs);

  const blogFormRef = useRef();

  return (
    <div className="blogs">
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      <ul>
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title} - {blog.author}
              </Link>
            </li>
            /*  <Blog key={blog.id} blog={blog} /> */
          ))}
      </ul>
    </div>
  );
};

export default BlogList;
