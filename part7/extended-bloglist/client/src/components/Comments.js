import { createComment } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";
import { useState } from "react";

const Comments = ({ blog }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  const { id, comments } = blog;

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(comment);
    dispatch(createComment(id, comment));
    setComment("");
  };

  return (
    <div>
      <h3>Comments</h3>
      <form onSubmit={onSubmit}>
        <input
          id="comment"
          type="text"
          value={comment}
          name="comment"
          onChange={({ target }) => setComment(target.value)}
        ></input>
        <button id="comment-button" type="submit">
          Comment
        </button>
      </form>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment}>{comment}</li>
          ))}
        </ul>
      ) : (
        <p>no comments...</p>
      )}
    </div>
  );
};

export default Comments;
