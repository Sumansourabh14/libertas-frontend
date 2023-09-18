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
      <h1>Libertas - Discuss about anything</h1>

      <Stack
        direction="row"
        justifyContent="space-between"
        style={{ padding: 20, backgroundColor: "#f3f3f3", margin: "2rem 0" }}
      >
        <h2>What is happening?</h2>
        <div>
          <Button
            variant="contained"
            onClick={() => router.push("/feed")}
            style={{ borderRadius: "0.5rem" }}
          >
            Check your feed
          </Button>
        </div>
      </Stack>
    </>
  );
};

export default Home;
