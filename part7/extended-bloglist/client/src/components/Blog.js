import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeBlog, deleteBlog } from "../reducers/blogReducer";
import { useNavigate, useParams } from "react-router-dom";
import Comments from "./Comments";
import { Button } from "@mui/material";

const Blog = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  );
  const user = useSelector((state) => state.login);

  const handleLike = () => {
    const likedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    console.log(likedBlog);
    dispatch(likeBlog(blog.id, likedBlog));
  };

  const handleDelete = () => {
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      //console.log(blog);
      dispatch(deleteBlog(blog));
      navigate("/blogs");
    }
  };
  //console.log(blog);

  return (
    <div className="blog">
      <div className="blog-title">
        <span className="title">{blog.title} - </span>
        <span className="author">{blog.author}</span>{" "}
      </div>
      <div className="blog-details">
        <div>
          Url:{" "}
          <a href={`${blog.url}`} target="_blank" rel="noreferrer">
            {blog.url}
          </a>
        </div>
        Likes: <span className="blog-likes">{blog.likes}</span>{" "}
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleLike}
          className="like-button"
        >
          like
        </Button>{" "}
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={handleDelete}
        >
          delete
        </Button>
      </div>
      <Comments blog={blog} />
    </div>
  );
};

export default Blog;
