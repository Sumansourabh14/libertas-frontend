import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Box, Button, IconButton, Modal, Stack } from "@mui/material";

const ConfirmedModal = ({
  title,
  body,
  isOpen,
  handleClose,
  handleConfirmation,
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
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
          <IconButton onClick={handleClose}>
            <HighlightOffIcon />
          </IconButton>
        </div>
        <Stack spacing={3} alignItems="center" style={{ textAlign: "center" }}>
          <h2>{title}</h2>
          {body && <p>{body}</p>}

          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              onClick={handleConfirmation}
              style={{ textTransform: "capitalize", backgroundColor: "#000" }}
            >
              Okay
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ConfirmedModal;
