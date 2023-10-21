import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Stack } from "@mui/material";

const PasswordChecks = ({ condition, trueIcon, falseIcon, message }) => {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <FontAwesomeIcon
        icon={condition ? trueIcon : falseIcon}
        color={condition ? "green" : "red"}
        size="sm"
      />
      <p style={{ fontSize: "0.8rem", textAlign: "left", color: "grey" }}>
        {message}
      </p>
    </Stack>
  );
};

export default PasswordChecks;
