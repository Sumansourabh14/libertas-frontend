"use client";
import ErrorText from "@/components/errorComponents/ErrorText";
import TextInput from "@/components/formComponents/TextInput";
import TitleText from "@/components/pageComponents/TitleText";
import { GlobalContext } from "@/services/globalContext";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
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
            <LoadingButton
              loading={loading}
              variant="contained"
              type="submit"
              sx={{
                textTransform: "capitalize",
                backgroundColor: "#FFFFFF",
                fontWeight: "600",
                borderRadius: "0rem",
                marginTop: 30,
              }}
              disabled={isButtonDisabled}
            >
              Send me a reset password email
            </LoadingButton>
          </Stack>
        </form>
      </div>
    </div>
  );
};

export default RecoverPassword;
