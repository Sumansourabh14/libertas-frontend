"use client";
import PrimaryButton from "@/components/buttonComponents/PrimaryButton";
import { Stack } from "@mui/material";
import { useRouter } from "next/navigation";

const About = () => {
  const year = new Date().getFullYear();
  const router = useRouter();

  return (
    <Stack>
      <Stack style={{ padding: 80 }} alignItems="center">
        <Stack spacing={3} style={{ textAlign: "center", minHeight: "50vh" }}>
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
  );
};

export default About;
