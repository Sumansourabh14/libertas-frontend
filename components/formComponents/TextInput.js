import { TextField } from "@mui/material";
import React from "react";

const TextInput = ({ type, placeholder, value, onChange, required }) => {
  return (
    <TextField
      type={type}
      label={placeholder}
      value={value}
      onChange={onChange}
      fullWidth
      // required={required}
      size="small"
    />
  );
};

export default TextInput;
