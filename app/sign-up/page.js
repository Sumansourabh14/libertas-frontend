"use client";
import ErrorText from "@/components/errorComponents/ErrorText";
import TextInput from "@/components/formComponents/TextInput";
import LoadingButton from "@/components/pageComponents/LoadingButton";
import { GlobalContext } from "@/services/globalContext";
import { colors } from "@/theme/colors";
import { Button, Stack } from "@mui/material";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export const metadata = {
  title: "Sign Up",
};

const SignUp = () => {
  const { loading, signUp, signUpError } = useContext(GlobalContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();

    signUp(name, username, email, password);
  };

  useEffect(() => {
    document.title = `Sign Up | Libertas`;
  }, []);

  return (
    <div style={{ padding: "4rem 0" }}>
      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        justifyContent="center"
        spacing={10}
      >
        <div>
          <Stack
            alignItems="center"
            spacing={2}
            style={{ marginBottom: "2rem", textAlign: "center" }}
          >
            <h1>Sign Up</h1>
            <p>Create an account to join Libertas</p>
          </Stack>

          <form onSubmit={handleSignUp}>
            <Stack spacing={2} style={{ textAlign: "center" }}>
              {signUpError && <ErrorText message={signUpError} />}
              <TextInput
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={true}
              />
              <TextInput
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required={true}
              />
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
              <Button
                variant="contained"
                type="submit"
                style={{
                  color: "#000",
                  textTransform: "capitalize",
                  backgroundColor: colors.accent,
                  fontWeight: "600",
                }}
              >
                Sign Up
                {loading && (
                  <div style={{ marginLeft: "0.6rem" }}>
                    <LoadingButton />
                  </div>
                )}
              </Button>
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: "0.875rem" }}>
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    style={{ color: "#000", textDecoration: "underline" }}
                  >
                    Login
                  </Link>
                </p>
              </div>
            </Stack>
          </form>
        </div>
      </Stack>
    </div>
  );
};

export default SignUp;
