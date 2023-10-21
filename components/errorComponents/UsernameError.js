import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Stack } from "@mui/material";

const UsernameError = ({ condition, message }) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      style={{ marginTop: 3 }}
    >
      <FontAwesomeIcon
        icon={condition === 201 ? faCircleCheck : faCircleXmark}
        color={condition === 201 ? "green" : "red"}
        size="sm"
      />
      <p
        style={{
          fontSize: "0.8rem",
          textAlign: "left",
          marginTop: "0.2rem",
          color: condition === 201 ? "green" : "red",
        }}
      >
        {message}
      </p>
    </Stack>
  );
};

export default UsernameError;
