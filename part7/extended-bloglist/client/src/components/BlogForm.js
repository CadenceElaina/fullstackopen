//import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import blogService from "../services/blogs";

const BlogForm = ({ togglableRef }) => {
  const dispatch = useDispatch();

  //const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });

  /*   const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBlog({ ...newBlog, [name]: value });
  }; */

  const handleCreateBlog = async (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const author = event.target.author.value;
    const url = event.target.url.value;
    event.target.title.value = "";
    event.target.author.value = "";
    event.target.url.value = "";
    console.log(title, author, url);
    //createBlog(newBlog.title, newBlog.author, newBlog.url);
    const newBlog = {
      title,
      author,
      url,
    };
    console.log(newBlog);
    //const newBlog = await blogService.create({ title, author, url });
    dispatch(createBlog(newBlog));
    //setNewBlog({ title: "", author: "", url: "" });
  };

  return (
    <div className="blog-form">
      <h2>Create new blog</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          title
          <input
            name="title"
            type="text"
            //value={newBlog.title}
            //onChange={handleInputChange}
          />
        </div>
        <div>
          author
          <input
            name="author"
            type="text"
            //value={newBlog.author}
            //onChange={handleInputChange}
          />
        </div>
        <div>
          url
          <input
            name="url"
            type="text"
            //value={newBlog.url}
            // onChange={handleInputChange}
          />
        </div>
        <button id="create-blog-btn" className="create-blog" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
