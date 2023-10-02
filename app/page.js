"use client";
import PrimaryButton from "@/components/buttonComponents/PrimaryButton";
import HowItWorks from "@/components/pageComponents/homePageSections/HowItWorks";
import { Button, Stack } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    document.title = "Libertas - Discuss about anything";
  }, []);

  const year = new Date().getFullYear();

  return (
    <>
      <Stack>
        <Stack
          className="homepage-hero-section"
          alignItems="center"
          spacing={6}
          style={{ padding: 100, textAlign: "center", minHeight: "90vh" }}
        >
          <h1 style={{ fontSize: "4rem", fontWeight: "900" }}>
            Discuss about anything
          </h1>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "400" }}>
            Create your account to get started
          </h2>
          <Stack direction="row" spacing={4} alignItems="center">
            <PrimaryButton
              color="#fff"
              title="Create Account"
              handleClick={() => router.push("/sign-up")}
              bgColor="#000"
            />
            <Link href={"/feed"} style={{ textDecoration: "underline" }}>
              or check what&apos;s happening!
            </Link>
          </Stack>
        </Stack>
        <HowItWorks />
        <footer style={{ backgroundColor: "#F4E869" }}>
          <Stack style={{ padding: 40 }}>
            <div
              style={{
                textAlign: "center",
                fontSize: "0.875rem",
              }}
            >
              <p>Libertas © {year}. All rights reserved.</p>
            </div>
          </Stack>
        </footer>
      </Stack>
    </>
  );
};

export default Home;
