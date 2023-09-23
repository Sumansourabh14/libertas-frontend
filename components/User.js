import { GlobalContext } from "@/services/globalContext";
import { Button, Paper, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { relativeTime } from "./utils/relativeTime";

const User = () => {
  const { user } = useContext(GlobalContext);
  const router = useRouter();

  return (
    <>
      {user && (
        <Paper elevation={6} style={{ maxHeight: "400px" }}>
          <Stack
            style={{ flex: 1, padding: "1rem 1rem" }}
            alignItems="center"
            spacing={1}
          >
            <h1 style={{ fontSize: "1.5rem" }}>{user?.name}</h1>
            <p>{user?.username}</p>
            <p>Joined {relativeTime(Date.parse(user?.createdAt))}</p>
            <p>
              Joined on{" "}
              {new Date(user?.createdAt)
                .toDateString()
                .split(" ")
                .splice(1, 3)
                .join(" ")}
            </p>
            <Button
              variant="contained"
              onClick={() => router.push("/create-post")}
            >
              New Post
            </Button>
          </Stack>
        </Paper>
      )}
    </>
  );
};

export default User;
