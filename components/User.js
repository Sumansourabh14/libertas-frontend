import { GlobalContext } from "@/services/globalContext";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, Paper, Stack } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { relativeTime } from "./utils/relativeTime";

const User = () => {
  const { user } = useContext(GlobalContext);
  const router = useRouter();

  return (
    <>
      {user && (
        <div>
          <Paper
            elevation={2}
            style={{
              minHeight: "300px",
              width: "280px",
              borderRadius: "0.5rem",
            }}
          >
            <Stack
              style={{
                flex: 1,
                padding: "1rem",
                textAlign: "center",
                fontSize: "0.875rem",
              }}
              alignItems="center"
              spacing={2}
            >
              <Avatar
                alt={user?.name}
                src={user.avatar}
                sx={{ width: 100, height: 100 }}
              />
              <h1 style={{ fontSize: "1.3rem" }}>{user?.name}</h1>
              <Stack direction="row" spacing={1} alignItems="center">
                <p>{user?.username}</p>
                <p>|</p>
                <p>{relativeTime(Date.parse(user?.createdAt))}</p>
              </Stack>
              {user?.bio && <p>{user?.bio}</p>}
              {user?.website !== "undefined" && user?.website?.length > 0 && (
                <p style={{ fontSize: "0.75rem" }}>
                  <span style={{ fontWeight: "600" }}>Website: </span>
                  <Link
                    href={user?.website}
                    style={{ textDecoration: "underline" }}
                  >
                    {user?.website}
                  </Link>
                </p>
              )}

              {user?.twitter !== "undefined" && user?.twitter?.length > 0 && (
                <Link href={user?.twitter} target="_blank">
                  <Stack
                    direction="row"
                    spacing={1}
                    style={{
                      padding: 10,
                      backgroundColor: "#FDF0F0",
                      borderRadius: "0.4rem",
                    }}
                    alignItems="center"
                  >
                    <FontAwesomeIcon icon={faXTwitter} />
                    <p style={{ fontWeight: "500", fontSize: "0.8rem" }}>
                      {
                        user?.twitter?.split("/")[
                          user?.twitter?.split("/").length - 1
                        ]
                      }
                    </p>
                  </Stack>
                </Link>
              )}

              {/* <Stack>
              <p>
                Joined on{" "}
                {new Date(user?.createdAt)
                  .toDateString()
                  .split(" ")
                  .splice(1, 3)
                  .join(" ")}
              </p>
            </Stack> */}
              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
                  onClick={() => router.push("/create-post")}
                  style={{
                    borderRadius: 0,
                    padding: "0.3rem 1rem",
                    fontWeight: "600",
                    textTransform: "capitalize",
                    backgroundColor: "#000",
                  }}
                >
                  New Post
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => router.push("/profile/update-profile")}
                  style={{
                    borderRadius: 0,
                    padding: "0.3rem 1rem",
                    fontWeight: "600",
                    textTransform: "capitalize",
                    borderColor: "#000",
                    color: "#000",
                  }}
                >
                  Edit profile
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </div>
      )}
    </>
  );
};

export default User;
