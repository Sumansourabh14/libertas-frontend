"use client";
import ErrorText from "@/components/errorComponents/ErrorText";
import TextInput from "@/components/formComponents/TextInput";
import LoadingButton from "@/components/pageComponents/LoadingButton";
import { GlobalContext } from "@/services/globalContext";
import { colors } from "@/theme/colors";
import { Button, Stack } from "@mui/material";
import { useContext, useEffect, useState } from "react";

const RecoverPassword = () => {
  const { loading, passwordRecoveryEmailError, sendPasswordRecoveryEmail } =
    useContext(GlobalContext);

  const [emailOrUsername, setEmailOrUsername] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    sendPasswordRecoveryEmail(emailOrUsername);
    // if (data.response.status === 400) {
    //   setError(data.response.data.message);
    // }
  };

  const isButtonDisabled = !emailOrUsername;

  useEffect(() => {
    document.title = `Recover Password | Libertas`;
  }, []);

  return (
    <div
      style={{ display: "flex", justifyContent: "center", padding: "4rem 0" }}
    >
      <div>
        <Stack
          alignItems="center"
          spacing={2}
          style={{ marginBottom: "2rem", textAlign: "center" }}
        >
          <h1>Recover Password</h1>
          <p>It&apos;s okay, we have got this!</p>
        </Stack>

        <form onSubmit={submitHandler}>
          <Stack spacing={2} style={{ textAlign: "center" }}>
            {passwordRecoveryEmailError && (
              <ErrorText message={passwordRecoveryEmailError} />
            )}
            <TextInput
              type="text"
              placeholder="Email or username"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              required={true}
            />
            <Button
              variant="contained"
              type="submit"
              style={{
                textTransform: "none",
                backgroundColor: colors.button.background,
                fontWeight: "600",
                borderRadius: "0rem",
              }}
              sx={{
                "&.Mui-disabled": {
                  color: "grey",
                },
              }}
              disabled={isButtonDisabled}
            >
              Send me a reset password email
              {loading && (
                <div style={{ marginLeft: "0.6rem" }}>
                  <LoadingButton />
                </div>
              )}
            </Button>
          </Stack>
        </form>
      </div>
    </div>
  );
};

export default RecoverPassword;
