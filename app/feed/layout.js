"use client";
import GlobalSideBar from "@/components/drawerComponents/GlobalSideBar";
import { Container } from "@mui/material";

export default function FeedLayout({ children }) {
  return (
    <section style={{ display: "flex" }}>
      <GlobalSideBar />
      <Container style={{ padding: "2rem 0" }}>{children}</Container>
    </section>
  );
}
