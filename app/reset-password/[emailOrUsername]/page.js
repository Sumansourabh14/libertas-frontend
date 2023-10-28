"use client";
import ErrorText from "@/components/errorComponents/ErrorText";
import TextInput from "@/components/formComponents/TextInput";
import LoadingButton from "@/components/pageComponents/LoadingButton";
import TitleText from "@/components/pageComponents/TitleText";
import { GlobalContext } from "@/services/globalContext";
import { colors } from "@/theme/colors";
import { Button, Stack } from "@mui/material";
import { useContext, useEffect, useState } from "react";

const ResetPassword = ({ params }) => {
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const { loading, getSpecificUser, resetUserPassword, passwordResetError } =
    useContext(GlobalContext);

  useEffect(() => {
    let mounted = true;

    const fetchUser = async () => {
      const data = await getSpecificUser(params.emailOrUsername);

      if (data?.data?.success) {
        setUser(data?.data?.user);
      }
    };

    fetchUser();

    return () => (mounted = false);
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    resetUserPassword(user?._id, password, password2);
  };

  const isButtonDisabled = password.length > 0 && password2.length > 0;

  return (
    <div
      style={{ display: "flex", justifyContent: "center", padding: "4rem 0" }}
    >
      <div>
        <TitleText title="Reset Password" />

        <form onSubmit={submitHandler}>
          <Stack spacing={2} style={{ textAlign: "center" }}>
            {passwordResetError && <ErrorText message={passwordResetError} />}
            <TextInput
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={true}
            />
            <TextInput
              type="password"
              placeholder="Confirm password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
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
              disabled={!isButtonDisabled}
            >
              Change Password
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

export default ResetPassword;
