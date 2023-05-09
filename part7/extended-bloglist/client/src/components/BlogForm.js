//import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";

const BlogForm = () => {
  const dispatch = useDispatch();

  const handleCreateBlog = async (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const author = event.target.author.value;
    const url = event.target.url.value;
    event.target.title.value = "";
    event.target.author.value = "";
    event.target.url.value = "";

    const newBlog = {
      title,
      author,
      url,
    };
    dispatch(createBlog(newBlog));
  };

  return (
    <div className="blog-form">
      <h2>Create new blog</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          title
          <input name="title" type="text" />
        </div>
        <div>
          author
          <input name="author" type="text" />
        </div>
        <div>
          url
          <input name="url" type="text" />
        </div>
        <button id="create-blog-btn" className="create-blog" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
