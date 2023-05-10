import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeBlog, deleteBlog } from "../reducers/blogReducer";
import { useNavigate } from "react-router-dom";
import Comments from "./Comments";

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /*  const [visible, setVisible] = useState(false); */
  //console.log(blog);
  //const hideWhenVisible = { display: visible ? 'none' : '' };
  /* const showWhenVisible = { display: visible ? "" : "none" }; */

  /*  const toggleVisibility = () => {
    setVisible(!visible);
  };
 */
  const handleLike = () => {
    const likedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    dispatch(likeBlog(blog.id, likedBlog));
  };

  const handleDelete = () => {
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      //console.log(blog);
      dispatch(deleteBlog(blog));
      navigate("/blogs");
    }
  };

  return (
    <div className="blog">
      <div className="blog-title">
        <span className="title">{blog.title} - </span>
        <span className="author">{blog.author}</span>{" "}
        {/*   <button onClick={toggleVisibility} className="toggle-button">
          {visible ? "hide" : "show"}
        </button> */}
      </div>
      <div /* style={showWhenVisible} */ className="blog-details">
        <p>
          Likes: <span className="blog-likes">{blog.likes}</span>{" "}
          <button onClick={handleLike} className="like-button">
            like
          </button>{" "}
        </p>
        Url:{" "}
        <a href={`${blog.url}`} target="_blank" rel="noreferrer">
          {blog.url}
        </a>
        <button className="remove-button" onClick={() => handleDelete(blog)}>
          remove
        </button>
      </div>
      <Comments blog={blog} />
    </div>
  );
};

export default Blog;
