"use client";
import { Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    document.title = "Libertas - Discuss about anything";
  }, []);

  return (
    <>
      <Stack spacing={4} style={{ padding: "1rem 0" }}>
        <Stack
          alignItems="center"
          spacing={6}
          style={{ padding: 20, textAlign: "center", height: "100vh" }}
        >
          <h1 style={{ fontSize: "4rem" }}>
            Libertas - Discuss about anything
          </h1>
          <h2>Create your account to get started</h2>
          <div>
            <Button
              variant="contained"
              onClick={() => router.push("/sign-up")}
              style={{
                borderRadius: "0.5rem",
                padding: "1rem 2rem",
                fontSize: "1rem",
                textTransform: "capitalize",
              }}
            >
              Create Account
            </Button>
          </div>
        </Stack>
        <div>
          <Button
            variant="contained"
            onClick={() => router.push("/feed")}
            style={{
              borderRadius: "0.5rem",
              padding: "1rem 2rem",
              fontSize: "1rem",
              textTransform: "capitalize",
            }}
          >
            Dive in now
          </Button>
        </div>
      </Stack>
    </>
  );
};

export default Home;
