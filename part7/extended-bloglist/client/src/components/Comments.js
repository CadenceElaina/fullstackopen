import { createComment } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";

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
        <Grid container>
          <Grid item>
            <TextField
              id="comment"
              type="text"
              value={comment}
              name="comment"
              size="small"
              onChange={({ target }) => setComment(target.value)}
            ></TextField>
          </Grid>
          <Grid item alignItems="stretch" style={{ display: "flex" }}>
            <Button
              id="comment-button"
              variant="contained"
              color="primary"
              type="submit"
            >
              Comment
            </Button>
          </Grid>
        </Grid>
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
