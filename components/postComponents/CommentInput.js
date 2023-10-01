import { Button, Stack, TextareaAutosize } from "@mui/material";

const CommentInput = ({ commentText, handleCommentText, handleAddComment }) => {
  return (
    <Stack spacing={2}>
      <h3>Add a comment</h3>
      <TextareaAutosize
        aria-label="textarea for comment"
        placeholder="Let your thoughts pour in!"
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
      <div>
        <Button variant="contained" onClick={handleAddComment}>
          Add
        </Button>
      </div>
    </Stack>
  );
};

export default CommentInput;
