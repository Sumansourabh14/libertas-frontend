import { Button, Stack, TextareaAutosize } from "@mui/material";
import OptionButton from "../buttonComponents/OptionButton";
import InsertCommentIcon from "@mui/icons-material/InsertComment";

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
        <OptionButton
          title={`Add`}
          handleClick={handleAddComment}
          icon={<InsertCommentIcon />}
          bgColor="#FFF"
          color="#000"
        />
      </div>
    </Stack>
  );
};

export default CommentInput;
