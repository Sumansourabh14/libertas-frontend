import { Button, TextareaAutosize } from "@mui/material";

const CommentInput = ({ commentText, handleCommentText, handleAddComment }) => {
  return (
    <>
      <TextareaAutosize
        aria-label="textarea for comment"
        placeholder="Add a comment"
        minRows={4}
        value={commentText}
        onChange={handleCommentText}
        style={{
          width: "100%",
          fontFamily: "inherit",
          fontSize: "1rem",
          padding: 10,
        }}
      />
      <Button variant="contained" onClick={handleAddComment}>
        Add
      </Button>
    </>
  );
};

export default CommentInput;
