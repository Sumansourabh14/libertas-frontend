"use client";
import ErrorText from "@/components/errorComponents/ErrorText";
import TextInput from "@/components/formComponents/TextInput";
import LoadingButton from "@/components/pageComponents/LoadingButton";
import TitleText from "@/components/pageComponents/TitleText";
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
        <TitleText
          title="Recover Password"
          text="It's okay, we have got this!"
        />

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
