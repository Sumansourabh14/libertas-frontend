"use client";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { Inter } from "next/font/google";
import { useState } from "react";
import Header from "../components/Header";
import { GlobalContextProvider } from "../services/globalContext";
import "./globals.css";
import GlobalSideBar from "@/components/drawerComponents/GlobalSideBar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [themeMode, setThemeMode] = useState("light");
  const mobileScreenSize = useMediaQuery("(max-width:600px)");

  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
  });

  const handleThemeChange = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <html lang="en">
      <GlobalContextProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <body className={inter.className}>
            <Header themeMode={themeMode} handleTheme={handleThemeChange} />
            {/* <main style={{ display: "flex" }}>
              <GlobalSideBar />
              <div style={{ padding: "6rem 2rem 0 2rem" }}>{children}</div>
            </main> */}

            <main
              style={{
                padding: mobileScreenSize ? "3rem 0 0 0" : "4rem 0 0 0",
              }}
            >
              {children}
            </main>
          </body>
        </ThemeProvider>
      </GlobalContextProvider>
    </html>
  );
}
