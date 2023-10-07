import { Button } from "@mui/material";

const PrimaryButton = ({ color, handleClick, title, bgColor }) => {
  return (
    <Button
      variant="contained"
      onClick={handleClick}
      style={{
        color: color ? color : "#000",
        borderRadius: "0.4rem",
        padding: "0.5rem 2rem",
        fontSize: "1rem",
        fontWeight: "600",
        textTransform: "capitalize",
        backgroundColor: bgColor ? bgColor : "#F4E869",
      }}
    >
      {title}
    </Button>
  );
};

export default PrimaryButton;
