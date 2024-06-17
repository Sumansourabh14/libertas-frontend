import { TextField } from "@mui/material";
import React from "react";

const TextInput = ({
  type,
  placeholder,
  value,
  onChange,
  required,
  nameOfInput,
}) => {
  return (
    <TextField
      type={type}
      label={placeholder}
      value={value}
      onChange={onChange}
      fullWidth
      required={required ? required : false}
      size="small"
      name={nameOfInput}
      sx={{
        input: { color: "#F3f3f3" },
      }}
    />
  );
};

export default TextInput;
