//import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { TextField, Button } from "@mui/material";

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
          <TextField label="title" type="text" name="title" />
          {/*   <input name="title" type="text" /> */}
        </div>
        <div>
          <TextField label="author" type="text" name="author" />
        </div>
        <div>
          <TextField label="url" type="text" name="url" />
        </div>
        <Button
          id="create-blog-btn"
          className="create-blog"
          variant="contained"
          color="primary"
          size="small"
          type="submit"
        >
          create
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;
