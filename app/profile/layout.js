"use client";
import ProfileSideBar from "@/components/drawerComponents/ProfileSideBar";
import { Container } from "@mui/material";

export default function ProfileLayout({ children }) {
  return (
    <section style={{ display: "flex", paddingTop: 20, paddingBottom: 20 }}>
      <ProfileSideBar />
      <Container>
        <div>{children}</div>
      </Container>
    </section>
  );
}
