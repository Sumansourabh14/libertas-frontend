"use client";
import PrimaryButton from "@/components/buttonComponents/PrimaryButton";
import Footer from "@/components/pageComponents/Footer";
import Heading from "@/components/pageComponents/Heading";
import NormalTitle from "@/components/textComponents/NormalTitle";
import { Stack } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

const About = () => {
  const router = useRouter();

  return (
    <Stack>
      <Stack style={{ padding: "4rem 0 2rem 0" }} alignItems="center">
        <Stack spacing={3} style={{ textAlign: "center", padding: "50px 0" }}>
          <NormalTitle title="About Us" />
          <p style={{ maxWidth: "700px" }}>
            Libertas is an online discussion platform where users can create
            posts, engage with them by upvoting or downvoting and by adding
            comments
          </p>
          <div>
            <PrimaryButton
              color="#fff"
              title="Check out Libertas"
              handleClick={() => router.push("/feed")}
              bgColor="#000"
            />
          </div>
        </Stack>
      </Stack>
      <Stack style={{ padding: 40, textAlign: "center" }} alignItems="center">
        <p
          style={{
            fontSize: "2rem",
            fontWeight: "300",
            textAlign: "center",
            maxWidth: "700px",
          }}
        >
          No moderators. No big corporate rules. Only for people.
        </p>
      </Stack>
      <Stack
        style={{ padding: 40, textAlign: "center" }}
        alignItems="center"
        spacing={2}
      >
        <Heading title="Built by" />
        <Stack spacing={1}>
          <Link
            href="https://sumansourabh.netlify.app/"
            style={{ fontSize: "1.5rem" }}
          >
            Suman Sourabh
          </Link>
          <p style={{ color: "grey" }}>Full Stack Developer</p>
        </Stack>
      </Stack>
      <Footer />
    </Stack>
  );
};

export default About;
