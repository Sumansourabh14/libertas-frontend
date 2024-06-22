import { colors } from "@/theme/colors";
import { Button } from "@mui/material";

const PrimaryButton = ({ color, handleClick, title, bgColor }) => {
  return (
    <Button
      variant="contained"
      onClick={handleClick}
      style={{
        color: color ? color : "#FFF",
        borderRadius: "0rem",
        padding: "0.5rem 2rem",
        fontSize: "1rem",
        fontWeight: "600",
        textTransform: "capitalize",
        backgroundColor: bgColor ? bgColor : colors.primary,
      }}
    >
      {title}
    </Button>
  );
};

export default PrimaryButton;
