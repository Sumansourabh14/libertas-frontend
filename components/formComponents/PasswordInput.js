import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import { useState } from "react";

const PasswordInput = ({ password, handlePassword, showCapsLockOnMessage }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockOnMessage, setCapsLockOnMessage] = useState("");

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // detect if caps lock is on
  const handleKeyUp = (e) => {
    const capsLockOn = e.getModifierState("CapsLock");

    if (capsLockOn) {
      setCapsLockOnMessage("Caps Lock is on");
    } else {
      setCapsLockOnMessage("");
    }
  };

  return (
    <Stack alignItems="flex-start" spacing={1}>
      <TextField
        size="small"
        type={showPassword ? "text" : "password"}
        label="Password"
        value={password}
        onChange={handlePassword}
        required={true}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        fullWidth
        onKeyUp={handleKeyUp}
      />
      {showCapsLockOnMessage && !!capsLockOnMessage && (
        <Stack direction="row" alignItems="center" spacing={1}>
          <FontAwesomeIcon icon={faCircleInfo} />
          <p style={{ fontSize: "0.875rem" }}>{capsLockOnMessage}</p>
        </Stack>
      )}
    </Stack>
  );
};

export default PasswordInput;
