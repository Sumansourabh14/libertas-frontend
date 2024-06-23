"use client";
import Footer from "@/components/pageComponents/Footer";
import Heading from "@/components/pageComponents/Heading";
import NormalTitle from "@/components/textComponents/NormalTitle";
import { colors } from "@/theme/colors";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Stack } from "@mui/material";
import Link from "next/link";

const Contact = () => {
  return (
    <Stack>
      <Stack style={{ padding: "4rem 0 2rem 0" }} alignItems="center">
        <Stack spacing={3} style={{ textAlign: "center", padding: "50px 0" }}>
          <NormalTitle title="Contact Libertas" />
          <p style={{ maxWidth: "700px" }}>
            Contact us in case of any queries.
          </p>
          <p style={{ maxWidth: "700px" }}>
            <strong>Gmail:</strong> libertas.discussion@gmail.com
          </p>
          <Link
            href="https://twitter.com/libertas_nextjs"
            target="_blank"
            aria-label="Libertas Twitter account"
            style={{ color: colors.secondary }}
          >
            <FontAwesomeIcon icon={faXTwitter} size="xl" />
          </Link>
        </Stack>
      </Stack>
      <Stack
        style={{ padding: 120, textAlign: "center" }}
        alignItems="center"
        spacing={2}
      >
        <Heading title="Built by" />
        <Stack spacing={1}>
          <Link
            href="https://sumansourabh.netlify.app/"
            target="_blank"
            style={{ fontSize: "1.5rem", color: "#FFF" }}
          >
            Suman Sourabh
          </Link>
          <p style={{ color: "grey" }}>Frontend Developer</p>
        </Stack>
      </Stack>
      <Footer />
    </Stack>
  );
};

export default Contact;
