import { Button } from "@mui/material";

const PrimaryButton = ({ handleClick, title, bgColor }) => {
  return (
    <Button
      variant="contained"
      onClick={handleClick}
      style={{
        color: "#000",
        borderRadius: "0.6rem",
        padding: "0.8rem 2rem",
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
