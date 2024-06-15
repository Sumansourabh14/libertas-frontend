import { Stack } from "@mui/material";
import Link from "next/link";
import React from "react";

const Author = ({ name, link, twitterHandle }) => {
  return (
    <Stack>
      <h4>{name}</h4>
      <Link
        href={link}
        target="_blank"
        title="Twitter"
        style={{
          fontSize: "0.875rem",
          color: "gray",
          textDecoration: "underline",
        }}
      >
        {twitterHandle}
      </Link>
    </Stack>
  );
};

export default Author;
