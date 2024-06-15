import Link from "next/link";
import React from "react";

const LinkBtn = ({ title, link }) => {
  return (
    <Link
      href={link}
      style={{
        padding: "0.5rem 1rem",
        backgroundColor: "#FFC700",
        borderRadius: "0rem",
        fontWeight: "600",
      }}
    >
      {title}
    </Link>
  );
};

export default LinkBtn;
