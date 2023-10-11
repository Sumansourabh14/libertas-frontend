"use client";
import PrimaryButton from "@/components/buttonComponents/PrimaryButton";
import Footer from "@/components/pageComponents/Footer";
import { Stack } from "@mui/material";
import { useRouter } from "next/navigation";

const About = () => {
  const router = useRouter();

  return (
    <Stack justifyContent="space-between" style={{ minHeight: "100vh" }}>
      <Stack style={{ padding: 80 }} alignItems="center">
        <Stack spacing={3} style={{ textAlign: "center", padding: "50px 0" }}>
          <h1 style={{ fontSize: "3rem", fontWeight: "900" }}>
            About Libertas
          </h1>
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
      <Footer />
    </Stack>
  );
};

export default About;
