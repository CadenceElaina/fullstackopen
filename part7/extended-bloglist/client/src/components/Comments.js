import { createComment } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";
import { Button, Grid, TextField } from "@mui/material";
import { useField } from "../hooks";

const Comments = ({ blog }) => {
  const dispatch = useDispatch();
  const { reset: resetComment, ...comment } = useField("text");

  const { id, comments } = blog;

  const onSubmit = (event) => {
    event.preventDefault();
    // console.log(comment);
    dispatch(createComment(id, comment));
    resetComment();
  };
  //console.log(comments);
  return (
    <div>
      <h3>Comments</h3>
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item>
            <TextField
              label="share your thoughts..."
              size="small"
              {...comment}
            />
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
