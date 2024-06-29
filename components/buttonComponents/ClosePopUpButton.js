import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { IconButton } from "@mui/material";

const ClosePopUpButton = ({ handleClosePopUp }) => {
  return (
    <div style={{ position: "absolute", top: 10, right: 10 }}>
      <IconButton onClick={handleClosePopUp}>
        <HighlightOffIcon />
      </IconButton>
    </div>
  );
};

export default ClosePopUpButton;
