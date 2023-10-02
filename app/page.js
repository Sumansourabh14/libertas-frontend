"use client";
import PrimaryButton from "@/components/buttonComponents/PrimaryButton";
import { Button, Stack } from "@mui/material";
import Link from "next/link";
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
          style={{ padding: 20, textAlign: "center" }}
        >
          <h1 style={{ fontSize: "4rem", fontWeight: "900" }}>
            Discuss about anything
          </h1>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "400" }}>
            Create your account to get started
          </h2>
          <Stack direction="row" spacing={4} alignItems="center">
            <PrimaryButton
              title="Create Account"
              handleClick={() => router.push("/sign-up")}
              bgColor="#F4E869"
            />
            <Link href={"/feed"} style={{ textDecoration: "underline" }}>
              or check what&apos;s happening!
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default Home;
