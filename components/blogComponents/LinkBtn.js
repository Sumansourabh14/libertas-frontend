import Link from "next/link";
import React from "react";

const LinkBtn = ({ title, link }) => {
  return (
    <Link
      href={link}
      style={{
        padding: "0.5rem 1rem",
        backgroundColor: "#FFF",
        borderRadius: "0rem",
        fontWeight: "600",
        color: "#000",
        textDecoration: "none",
      }}
    >
      {title}
    </Link>
  );
};

export default LinkBtn;
