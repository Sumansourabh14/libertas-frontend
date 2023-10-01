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
            <IconButton onClick={handleTheme}>
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
            </IconButton>
            {/* <Link href="/about">About</Link> */}
            {isAuthenticated ? (
              <>
                <Link href="/create-post">Create Post</Link>
                <Link href="/profile">Profile</Link>
                <Button
                  variant="contained"
                  onClick={handleLogout}
                  color="error"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">Login</Link>
                <Link
                  href="/sign-up"
                  style={{
                    padding: "0.8rem 1rem",
                    backgroundColor: "#1db954",
                    borderRadius: "0.2rem",
                    fontWeight: "600",
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
