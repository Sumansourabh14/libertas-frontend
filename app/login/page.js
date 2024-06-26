"use client";
import ErrorText from "@/components/errorComponents/ErrorText";
import PasswordInput from "@/components/formComponents/PasswordInput";
import TitleText from "@/components/pageComponents/TitleText";
import { GlobalContext } from "@/services/globalContext";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import TextInput from "../../components/formComponents/TextInput";

const Login = () => {
  const { loading, login, loginError, user } = useContext(GlobalContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();

    // console.log(email, password);
    login(email, password);
  };

  useEffect(() => {
    if (user) {
      router.push("/feed");
    }
  }, [user]);

  useEffect(() => {
    document.title = `Login | Libertas`;
  }, []);

  return (
    <div
      style={{ display: "flex", justifyContent: "center", padding: "4rem 0" }}
    >
      <div>
        <TitleText title="Login" text="Sign in to your account on Libertas" />

        <form onSubmit={submitHandler}>
          <Stack spacing={2} style={{ textAlign: "center" }}>
            {loginError && <ErrorText message={loginError} />}
            <TextInput
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={true}
            />
            <PasswordInput
              password={password}
              handlePassword={(e) => setPassword(e.target.value)}
              showCapsLockOnMessage={true}
            />
            <Stack alignItems="flex-end" style={{ marginTop: 8 }}>
              <Link
                href="/recover-password"
                style={{
                  fontSize: "0.875rem",
                }}
              >
                Forgot password?
              </Link>
            </Stack>
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
              disabled={!(email && password)}
            >
              Login
            </LoadingButton>
            <p style={{ textAlign: "center", fontSize: "0.875rem" }}>
              Don&apos;t have an account? <Link href="/sign-up">Sign up</Link>
            </p>
          </Stack>
        </form>
      </div>
    </div>
  );
};

export default Login;
