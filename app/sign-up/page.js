"use client";
import ErrorText from "@/components/errorComponents/ErrorText";
import UsernameError from "@/components/errorComponents/UsernameError";
import PasswordChecks from "@/components/formComponents/PasswordChecks";
import PasswordInput from "@/components/formComponents/PasswordInput";
import TextInput from "@/components/formComponents/TextInput";
import TitleText from "@/components/pageComponents/TitleText";
import { GlobalContext } from "@/services/globalContext";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
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
  const [isPasswordLength, setIsPasswordLength] = useState(false);
  const [isAnyLowerCase, setIsAnyLowerCase] = useState(false);
  const [isAnyUpperCase, setIsAnyUpperCase] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);

    if (e.target.value.length > 7) {
      setIsPasswordLength(true);
    } else {
      setIsPasswordLength(false);
    }

    const checkLowerCase = new RegExp("(?=.*[a-z])");
    const checkUpperCase = new RegExp("(?=.*[A-Z])");

    if (checkLowerCase.test(e.target.value)) {
      setIsAnyLowerCase(true);
    } else {
      setIsAnyLowerCase(false);
    }

    if (checkUpperCase.test(e.target.value)) {
      setIsAnyUpperCase(true);
    } else {
      setIsAnyUpperCase(false);
    }
  };

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
    if (!!username) checkUsername(username);
  }, [username]);

  return (
    <div
      style={{ display: "flex", justifyContent: "center", padding: "2rem 0" }}
    >
      <div>
        <TitleText title="Sign Up" text="Create an account to join Libertas" />

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
                condition={usernameErrorCode}
                message={usernameMessage}
              />
            )}
            {/* <p style={{ fontSize: "0.8rem", color: "grey", marginTop: 2 }}>
              People on Libertas will remember you by this
            </p> */}
            <TextInput
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={true}
            />
            <PasswordInput
              password={password}
              handlePassword={handlePasswordChange}
              showCapsLockOnMessage={true}
            />
            <Stack style={{ marginTop: 8 }}>
              <PasswordChecks
                condition={isPasswordLength}
                trueIcon={faCircleCheck}
                falseIcon={faCircleXmark}
                message="At least 8 characters"
              />
              <PasswordChecks
                condition={isAnyLowerCase}
                trueIcon={faCircleCheck}
                falseIcon={faCircleXmark}
                message="1 lowercase letter"
              />
              <PasswordChecks
                condition={isAnyUpperCase}
                trueIcon={faCircleCheck}
                falseIcon={faCircleXmark}
                message="1 uppercase letter"
              />
            </Stack>
            <LoadingButton
              loading={loading}
              variant="contained"
              type="submit"
              sx={{
                textTransform: "capitalize",
                backgroundColor: "#FFF",
                color: "#000",
                fontWeight: "600",
                borderRadius: "0rem",
                marginTop: 30,
              }}
              disabled={!(isPasswordLength && isAnyLowerCase && isAnyUpperCase)}
            >
              Sign Up
            </LoadingButton>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: "0.875rem" }}>
                Already have an account?{" "}
                <Link
                  href="/login"
                  style={{ color: "#FFF", textDecoration: "underline" }}
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
