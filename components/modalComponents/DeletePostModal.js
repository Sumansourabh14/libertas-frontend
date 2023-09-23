import { Box, Button, Modal, Typography } from "@mui/material";

const DeletePostModal = ({
  isPostRemove,
  handleDeleteModalClose,
  handleDeletePost,
}) => {
  return (
    <Modal
      open={isPostRemove}
      onClose={handleDeleteModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          padding: 30,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Delete post?
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Are you sure you want to delete your post? You cannot undo this.
        </Typography>
        <div>
          <Button variant="contained" color="error" onClick={handleDeletePost}>
            Delete Post
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default DeletePostModal;
