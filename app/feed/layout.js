"use client";
import GlobalSideBar from "@/components/drawerComponents/GlobalSideBar";

export default function FeedLayout({ children }) {
  return (
    <section style={{ display: "flex" }}>
      <GlobalSideBar />
      <div>{children}</div>
    </section>
  );
}
