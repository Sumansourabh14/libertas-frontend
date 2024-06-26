import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  useMediaQuery,
} from "@mui/material";

const DeletePostModal = ({
  title,
  body,
  isPostRemove,
  handleDeleteModalClose,
  handleDeletePost,
}) => {
  const mobileScreenSize = useMediaQuery("(max-width:600px)");

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
          width: mobileScreenSize ? 350 : 500,
          backgroundColor: "#171717",
          boxShadow: 24,
          padding: 40,
        }}
      >
        <div style={{ position: "absolute", top: 10, right: 10 }}>
          <IconButton onClick={handleDeleteModalClose}>
            <HighlightOffIcon />
          </IconButton>
        </div>
        <Stack spacing={3} alignItems="center" style={{ textAlign: "center" }}>
          <h2>{title}</h2>
          <p>{body}</p>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              onClick={handleDeleteModalClose}
              sx={{
                textTransform: "capitalize",
                borderRadius: 0,
                color: "#FFF",
                border: "1px solid #FFF",
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeletePost}
              sx={{ textTransform: "capitalize", borderRadius: 0 }}
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
