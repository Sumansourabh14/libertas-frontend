"use client";
import GlobalSideBar from "@/components/drawerComponents/GlobalSideBar";
import { Container } from "@mui/material";

export default function FeedLayout({ children }) {
  return (
    <section style={{ display: "flex" }}>
      <GlobalSideBar />
      <Container>{children}</Container>
    </section>
  );
}
