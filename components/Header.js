"use client"; // For MUI to work
import { GlobalContext } from "@/services/globalContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  TextField,
  Toolbar,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import Link from "next/link";
import { useContext, useState } from "react";

const Header = ({ themeMode, handleTheme }) => {
  const { isAuthenticated, logout, searchBook, theme } =
    useContext(GlobalContext);

  const [searchTerm, setSearchTerm] = useState("");
  const matches = useMediaQuery("(min-width:600px)");

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
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        style={{ backgroundColor: "#000", borderBottom: "1px solid white" }}
      >
        <Toolbar>
          <h2
            style={{
              flexGrow: 1,
              color: theme.palette.mode === "light" ? "#000" : "#fff",
            }}
          >
            <Link
              href={"/"}
              style={{
                color: "#FFF",
              }}
            >
              <span
                style={{
                  color: "#FFC700",
                }}
              >
                L
              </span>
              ibertas
            </Link>
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
                {matches && (
                  <Link
                    href="/create-post"
                    style={{
                      color: "#FFF",
                    }}
                  >
                    Create Post
                  </Link>
                )}
                <Link
                  href="/profile"
                  style={{
                    color: "#FFF",
                  }}
                >
                  Profile
                </Link>
                <Button
                  variant="outlined"
                  onClick={handleLogout}
                  style={{
                    color: "#FFF",
                    border: "1px solid #FFF",
                    textTransform: "capitalize",
                    fontSize: "1rem",
                    fontWeight: "500",
                    borderRadius: 0,
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                {matches && (
                  <>
                    <Link
                      href="/about"
                      style={{
                        fontWeight: "500",
                        color: "#FFF",
                      }}
                    >
                      About
                    </Link>
                    <Link
                      href="/blog"
                      style={{
                        fontWeight: "500",
                        color: "#FFF",
                      }}
                    >
                      Blog
                    </Link>
                  </>
                )}
                <Link
                  href="/login"
                  style={{
                    fontWeight: "500",
                    color: "#FFF",
                  }}
                >
                  Login
                </Link>
                <Link
                  href="/sign-up"
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#FFF",
                    borderRadius: "0rem",
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
