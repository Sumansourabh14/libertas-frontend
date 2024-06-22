"use client";
import { Stack } from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";

const PasswordRecoveryEmailSent = () => {
  useEffect(() => {
    document.title = `Password recovery email sent | Libertas`;
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
          <h1>Check your email</h1>
          <p>
            An email has been sent to your email address to reset your password.
          </p>
          <Link
            href="/login"
            style={{
              fontSize: "0.875rem",
            }}
          >
            Back to login
          </Link>
        </Stack>
      </div>
    </div>
  );
};

export default PasswordRecoveryEmailSent;
