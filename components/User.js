import { GlobalContext } from "@/services/globalContext";
import { Paper, Stack } from "@mui/material";
import { useContext } from "react";
import NewPost from "./buttonComponents/NewPost";
import { relativeTime } from "./utils/relativeTime";

const User = () => {
  const { user } = useContext(GlobalContext);

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
            <Stack>
              <p>Joined {relativeTime(Date.parse(user?.createdAt))}</p>
              <p>
                Joined on{" "}
                {new Date(user?.createdAt)
                  .toDateString()
                  .split(" ")
                  .splice(1, 3)
                  .join(" ")}
              </p>
            </Stack>
            <NewPost />
          </Stack>
        </Paper>
      )}
    </>
  );
};

export default User;
