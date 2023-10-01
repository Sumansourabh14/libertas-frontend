import { Button, Stack } from "@mui/material";
import { relativeTime } from "../utils/relativeTime";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/services/globalContext";
import DeletePostModal from "../modalComponents/DeletePostModal";
import { useRouter } from "next/navigation";

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
    <Stack spacing={1}>
      <strong>{author?.username}</strong>
      <p>{relativeTime(comment.createdAt)}</p>
      <p>{comment.body}</p>
      {comment.author === user?._id && (
        <Stack>
          <div>
            <Button variant="contained" onClick={handleOpenDeleteCommentModal}>
              Delete
            </Button>
          </div>
        </Stack>
      )}
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
