import { Button } from "@mui/material";

const OptionButton = ({ title, icon, handleClick, bgColor, size }) => {
  return (
    <Button
      size={size ? size : "small"}
      variant="contained"
      onClick={handleClick}
      startIcon={icon}
      style={{
        textTransform: "capitalize",
        backgroundColor: bgColor ? bgColor : "blue",
      }}
    >
      {title}
    </Button>
  );
};

export default OptionButton;
