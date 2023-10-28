"use client";
import PrimaryButton from "@/components/buttonComponents/PrimaryButton";
import Footer from "@/components/pageComponents/Footer";
import HowItWorks from "@/components/pageComponents/homePageSections/HowItWorks";
import HomePageTitle from "@/components/textComponents/HomePageTitle";
import { Container, Stack, useMediaQuery } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();
  const mobileScreenSize = useMediaQuery("(max-width:600px)");
  const tabletScreenSize = useMediaQuery(
    "(min-width:600px) and (max-width:1200px)"
  );
  // const laptopScreenSize = useMediaQuery(
  //   "(min-width:1200px) and (max-width:1536px)"
  // );

  useEffect(() => {
    document.title = "Libertas - Discuss about anything";
  }, []);

  return (
    <>
      <Stack>
        <Stack
          className="homepage-hero-section"
          alignItems="center"
          justifyContent="center"
          spacing={6}
          style={{
            padding: mobileScreenSize
              ? "100px 30px"
              : tabletScreenSize
              ? "130px 60px"
              : "140px 60px",
            textAlign: "center",
          }}
        >
          <HomePageTitle title={`Discuss about anything`} />
          <h2
            style={{
              fontSize: mobileScreenSize ? "1.3rem" : "1.8rem",
              fontWeight: "400",
            }}
          >
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
