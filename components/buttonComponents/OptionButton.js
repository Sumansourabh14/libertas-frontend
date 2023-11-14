import { colors } from "@/theme/colors";
import { Button } from "@mui/material";

const OptionButton = ({
  title,
  icon,
  handleClick,
  color,
  bgColor,
  size,
  variant,
}) => {
  return (
    <Button
      size={size ? size : "small"}
      variant={variant ? variant : "contained"}
      onClick={handleClick}
      startIcon={icon}
      style={{
        textTransform: "capitalize",
        backgroundColor: bgColor ? bgColor : colors.primary,
        color: color ? color : colors.secondary,
        borderRadius: 0,
      }}
    >
      {title}
    </Button>
  );
};

export default OptionButton;
