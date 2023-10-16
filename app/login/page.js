"use client";
import ErrorText from "@/components/errorComponents/ErrorText";
import LoadingButton from "@/components/pageComponents/LoadingButton";
import { GlobalContext } from "@/services/globalContext";
import { Button, Stack } from "@mui/material";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import TextInput from "../../components/formComponents/TextInput";
import { useRouter } from "next/navigation";
import { colors } from "@/theme/colors";

const Login = () => {
  const { loading, login, loginError, user } = useContext(GlobalContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();

    console.log(email, password);
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
        <Stack
          alignItems="center"
          spacing={2}
          style={{ marginBottom: "2rem", textAlign: "center" }}
        >
          <h1>Login</h1>
          <p>Sign in to your account on Libertas</p>
        </Stack>

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
            <TextInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={true}
            />
            <Stack alignItems="flex-end">
              <Link
                href="/recover-password"
                style={{
                  fontSize: "0.875rem",
                  color: "#000",
                  textDecoration: "underline",
                }}
              >
                Forgot password?
              </Link>
            </Stack>
            <Button
              variant="contained"
              type="submit"
              style={{
                textTransform: "capitalize",
                backgroundColor: colors.button.background,
                fontWeight: "600",
                borderRadius: "0rem",
              }}
            >
              Login
              {loading && (
                <div style={{ marginLeft: "0.6rem" }}>
                  <LoadingButton />
                </div>
              )}
            </Button>
            <p style={{ textAlign: "center", fontSize: "0.875rem" }}>
              Don&apos;t have an account?{" "}
              <Link
                href="/sign-up"
                style={{ color: "#000", textDecoration: "underline" }}
              >
                Sign up
              </Link>
            </p>
          </Stack>
        </form>
      </div>
    </div>
  );
};

export default Login;
