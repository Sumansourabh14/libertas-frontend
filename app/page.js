"use client";
import PrimaryButton from "@/components/buttonComponents/PrimaryButton";
import Footer from "@/components/pageComponents/Footer";
import CommentFeature from "@/components/pageComponents/homePageSections/CommentFeature";
import CreatePostFeature from "@/components/pageComponents/homePageSections/CreatePostFeature";
import FaqHomePage from "@/components/pageComponents/homePageSections/FaqHomePage";
import HowItWorks from "@/components/pageComponents/homePageSections/HowItWorks";
import HomePageTitle from "@/components/textComponents/HomePageTitle";
import { openSans } from "@/theme/fonts";
import { Container, Stack, useMediaQuery } from "@mui/material";
import Image from "next/image";
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
          alignItems="center"
          justifyContent="center"
          spacing={4}
          style={{
            padding: mobileScreenSize
              ? "60px 30px"
              : tabletScreenSize
              ? "80px 60px"
              : "90px 60px",
            textAlign: "center",
          }}
        >
          <HomePageTitle title={`Discuss about anything`} />
          <h2
            style={{
              color: "gray",
              fontSize: mobileScreenSize ? "1.2rem" : "1.5rem",
              fontWeight: "400",
            }}
          >
            No moderators. No corporate rules. Created only for people.
          </h2>
          <Stack
            direction={mobileScreenSize ? "column" : "row"}
            spacing={4}
            alignItems="center"
          >
            <PrimaryButton
              bgColor="#FFF"
              color="#000"
              title="Create Account"
              handleClick={() => router.push("/sign-up")}
            />
            <Link
              href={"/feed"}
              style={{ textDecoration: "underline", color: "#FFF" }}
            >
              or check what&apos;s happening!
            </Link>
          </Stack>
          <Stack style={{ paddingTop: "4rem" }}>
            <Image
              src={`https://firebasestorage.googleapis.com/v0/b/libertas-frontend.appspot.com/o/posts%2Flibertas-loggedin-feed.pngdff6666e-db66-4b07-ba24-ff983323d1b1?alt=media&token=6b625105-88ea-4700-aa6c-6ffe13955ab1`}
              alt="Libertas news feed page"
              width={1200}
              height={300}
              style={{
                maxWidth: "100%",
                height: "auto",
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
              }}
            />
          </Stack>
        </Stack>
        <HowItWorks />
        <Container>
          <CreatePostFeature />
          <CommentFeature />
        </Container>
        <hr />
        <FaqHomePage />
        <Stack sx={{ bgcolor: "#FFF" }}>
          <Container>
            <Stack
              alignItems="center"
              spacing={2}
              style={{
                padding: mobileScreenSize ? "100px 30px" : "140px 60px",
                textAlign: "center",
              }}
            >
              <h2
                className={openSans.className}
                style={{
                  fontSize: mobileScreenSize ? "2rem" : "3rem",
                  fontWeight: "100",
                  color: "#000",
                }}
              >
                What are you waiting for?
              </h2>
              <Stack gap={2} style={{ marginBottom: "1rem" }}>
                <p style={{ color: "#000" }}>
                  Discussion is completey FREE here!
                </p>
                <p style={{ color: "#000" }}>
                  Just click the button below to start your journey on Libertas.
                </p>
              </Stack>
              <Link
                href={`/sign-up`}
                style={{
                  color: "#FFF",
                  textDecoration: "none",
                  backgroundColor: "#000",
                  padding: "0.75rem 3.75rem",
                  fontSize: "1.2rem",
                }}
              >
                Sign up now!
              </Link>
            </Stack>
          </Container>
        </Stack>
        <Footer />
      </Stack>
    </>
  );
};

export default Home;
