"use client"; // For MUI to work
import { GlobalContext } from "@/services/globalContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Toolbar,
  Tooltip,
} from "@mui/material";
import Link from "next/link";
import { useContext, useState } from "react";

const Header = ({ themeMode, handleTheme }) => {
  const { isAuthenticated, logout, searchBook, theme } =
    useContext(GlobalContext);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    searchBook(searchTerm);
  };

  // console.log({ isAuthenticated });

  const handleLogout = () => {
    logout();
  };

  return (
    <Box>
      <AppBar
        position="fixed"
        className="app-bar-backdrop"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        // sx={{ backgroundColor: "#000" }}
      >
        <Toolbar>
          <h2
            style={{
              flexGrow: 1,
              color: theme.palette.mode === "light" ? "#000" : "#fff",
            }}
          >
            <Link href={"/"}>Libertas</Link>
          </h2>
          <Stack direction="row" alignItems="center" spacing={3}>
            {/* <form onSubmit={handleSearch}>
              <TextField
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search"
                size="small"
              />
              <IconButton type="submit">
                <SearchIcon />
              </IconButton>
            </form> */}
            {/* <IconButton onClick={handleTheme}>
              {themeMode === "light" ? (
                <Tooltip title="Change theme to Dark mode">
                  <div>
                    <LightModeIcon />
                  </div>
                </Tooltip>
              ) : (
                <Tooltip title="Change theme to Light mode">
                  <div>
                    <DarkModeIcon />
                  </div>
                </Tooltip>
              )}
            </IconButton> */}
            {/* <Link href="/about">About</Link> */}
            {isAuthenticated ? (
              <>
                <Link href="/create-post">Create Post</Link>
                <Link href="/profile">Profile</Link>
                <Button
                  variant="outlined"
                  onClick={handleLogout}
                  style={{
                    color: "#000",
                    border: "1px solid grey",
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/about"
                  style={{
                    fontWeight: "500",
                  }}
                >
                  About
                </Link>
                <Link
                  href="/login"
                  style={{
                    fontWeight: "500",
                  }}
                >
                  Login
                </Link>
                <Link
                  href="/sign-up"
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#F4E869",
                    borderRadius: "0.2rem",
                    fontWeight: "600",
                    border: "1px solid grey",
                  }}
                >
                  Sign Up
                </Link>
              </>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
