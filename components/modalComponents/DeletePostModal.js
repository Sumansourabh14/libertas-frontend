import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Box, Button, IconButton, Modal, Stack } from "@mui/material";

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
          backgroundColor: "#fff",
          boxShadow: 24,
          padding: 40,
          borderRadius: "1rem",
        }}
      >
        <div style={{ position: "absolute", top: 10, right: 10 }}>
          <IconButton onClick={handleDeleteModalClose}>
            <HighlightOffIcon />
          </IconButton>
        </div>
        <Stack spacing={3} alignItems="center" style={{ textAlign: "center" }}>
          <h2>Delete post?</h2>
          <p>
            Are you sure you want to delete your post? You cannot undo this.
          </p>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              onClick={handleDeleteModalClose}
              style={{ textTransform: "capitalize" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeletePost}
              style={{ textTransform: "capitalize" }}
            >
              Delete
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default DeletePostModal;
