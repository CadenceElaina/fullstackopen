import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";

const NewBlog = () => {
  const dispatch = useDispatch();

  const addBlog = (event) => {
    event.preventDefault();
    const content = event.target.blog.value;
    event.target.blog.value = "";
    dispatch(createBlog(content));
  };

  return (
    <form onSubmit={addBlog}>
      <input name="blog" />
      <button type="submit">add</button>
    </form>
  );
};

export default NewBlog;
