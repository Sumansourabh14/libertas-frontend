"use client";
import PrimaryButton from "@/components/buttonComponents/PrimaryButton";
import Footer from "@/components/pageComponents/Footer";
import HowItWorks from "@/components/pageComponents/homePageSections/HowItWorks";
import { Button, Container, Stack, useMediaQuery } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();
  const mobileScreenSize = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    document.title = "Libertas - Discuss about anything";
  }, []);

  return (
    <>
      <Stack>
        <Stack
          className="homepage-hero-section"
          alignItems="center"
          spacing={6}
          style={{
            padding: mobileScreenSize ? "100px 30px" : "150px 60px",
            textAlign: "center",
            minHeight: "550px",
          }}
        >
          <h1
            style={{
              fontSize: mobileScreenSize ? "3rem" : "4rem",
              fontWeight: "900",
            }}
          >
            Discuss about anything
          </h1>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "400" }}>
            Create your account to get started
          </h2>
          <Stack
            direction={mobileScreenSize ? "column" : "row"}
            spacing={4}
            alignItems="center"
          >
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
        <Container>
          <HowItWorks />
        </Container>
        <Footer />
      </Stack>
    </>
  );
};

export default Home;
