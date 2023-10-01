import { Button, IconButton, Stack, Tooltip } from "@mui/material";
import { relativeTime } from "../utils/relativeTime";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/services/globalContext";
import DeletePostModal from "../modalComponents/DeletePostModal";
import { useRouter } from "next/navigation";
import DeleteIcon from "@mui/icons-material/Delete";

const CommentSingle = ({ comment }) => {
  const [isCommentRemove, setIsCommentRemove] = useState(false);
  const [author, setAuthor] = useState(null);

  const router = useRouter();

  const { getSpecificUser, removeComment, user } = useContext(GlobalContext);

  const handleCloseDeleteCommentModal = () => {
    setIsCommentRemove(false);
  };

  const handleOpenDeleteCommentModal = () => {
    setIsCommentRemove(true);
  };

  const handleDeleteComment = async () => {
    const data = await removeComment(comment?.postId, comment?._id);
    if (data?.data?.success) {
      setIsCommentRemove(false);

      router.back();
    }
  };

  useEffect(() => {
    const fetchAuthor = async () => {
      const data = await getSpecificUser(comment?.author);
      setAuthor(data?.data?.user);
    };

    fetchAuthor();
  }, [comment]);

  return (
    <Stack
      spacing={1}
      style={{
        backgroundColor: "#F1F6F9",
        padding: 16,
        borderRadius: "0.5rem",
        boxShadow: `rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px`,
      }}
    >
      <strong>{author?.username}</strong>
      <p>{comment.body}</p>
      {comment.author === user?._id && (
        <Stack>
          <div>
            <Button
              variant="contained"
              color="error"
              onClick={handleOpenDeleteCommentModal}
            >
              Delete
            </Button>
            {/* <Tooltip title="Delete" arrow>
              <IconButton
                onClick={handleOpenDeleteCommentModal}
                aria-label="delete comment"
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip> */}
          </div>
        </Stack>
      )}
      <p style={{ fontSize: "0.875rem", fontWeight: "300", color: "gray" }}>
        {relativeTime(comment.createdAt)}
      </p>
      <DeletePostModal
        title="Delete comment?"
        body="Are you sure you want to delete your comment? You cannot undo this."
        isPostRemove={isCommentRemove}
        handleDeleteModalClose={handleCloseDeleteCommentModal}
        handleDeletePost={handleDeleteComment}
      />
    </Stack>
  );
};

export default CommentSingle;
