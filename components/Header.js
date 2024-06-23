"use client"; // For MUI to work
import { GlobalContext } from "@/services/globalContext";
import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

const Header = () => {
  const { isAuthenticated, logout, theme } = useContext(GlobalContext);

  const [searchTerm, setSearchTerm] = useState("");
  const matches = useMediaQuery("(min-width:600px)");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();

    const query = encodeURI(searchTerm);

    if (query.trim().length > 0) {
      router.push(`/search?query=${query}`);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: "#000" }}
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
                textDecoration: "none",
              }}
            >
              <span
                style={{
                  color: "#FFF",
                }}
              >
                L
              </span>
              ibertas
            </Link>
          </h2>
          <Stack direction="row" alignItems="center" spacing={3}>
            {matches && (
              <form onSubmit={handleSearch}>
                <TextField
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search"
                  size="small"
                  sx={{ backgroundColor: "#000" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </form>
            )}
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
                    border: "1px solid red",
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
                      href="/blog"
                      style={{
                        fontWeight: "500",
                        color: "#FFF",
                      }}
                    >
                      Blog
                    </Link>
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
                      href="/contact"
                      style={{
                        fontWeight: "500",
                        color: "#FFF",
                      }}
                    >
                      Contact
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
                    color: "#000",
                    textDecoration: "none",
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
