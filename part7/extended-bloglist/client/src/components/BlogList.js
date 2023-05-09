import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "../reducers/blogReducer";

import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import Blog from "./Blog";

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
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </div>
  );
};

export default BlogList;
