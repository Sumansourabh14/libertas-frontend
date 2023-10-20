"use client";
import ErrorText from "@/components/errorComponents/ErrorText";
import UsernameError from "@/components/errorComponents/UsernameError";
import PasswordInput from "@/components/formComponents/PasswordInput";
import TextInput from "@/components/formComponents/TextInput";
import LoadingButton from "@/components/pageComponents/LoadingButton";
import { GlobalContext } from "@/services/globalContext";
import { colors } from "@/theme/colors";
import { Button, Stack } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const SignUp = () => {
  const {
    loading,
    signUp,
    signUpError,
    user,
    checkUsername,
    usernameMessage,
    usernameErrorCode,
  } = useContext(GlobalContext);
  const router = useRouter();

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

  useEffect(() => {
    if (user) router.push("/feed");
  }, [user]);

  useEffect(() => {
    if (username) checkUsername(username);
  }, [username]);

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
            {usernameMessage && (
              <UsernameError
                color={usernameErrorCode === 201 ? "green" : "red"}
                message={usernameMessage}
              />
            )}
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
            />
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
    </div>
  );
};

export default SignUp;
