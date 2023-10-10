"use client";
import GlobalSideBar from "@/components/drawerComponents/GlobalSideBar";
import { Container, useMediaQuery } from "@mui/material";

export default function FeedLayout({ children }) {
  const matches = useMediaQuery("(min-width:600px)");

  return (
    <section style={{ display: "flex" }}>
      {matches && <GlobalSideBar />}

      <Container style={{ padding: "2rem 0" }}>{children}</Container>
    </section>
  );
}
