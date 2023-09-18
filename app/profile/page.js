"use client";
import User from "@/components/User";
import { GlobalContext } from "@/services/globalContext";
import {
  Box,
  Button,
  Container,
  Modal,
  Paper,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [postId, setPostId] = useState(null);
  const [isPostRemoved, setIsPostRemoved] = useState(false);
  const [isPostRemove, setIsPostRemove] = useState(false);

  const { user, fetchPosts, removePost } = useContext(GlobalContext);
  const router = useRouter();

  useEffect(() => {
    console.log(
      new Date(user?.createdAt).toDateString().split(" ").splice(1, 3).join(" ")
    );
    console.log(new Date(user?.createdAt).toDateString());

    // if (!user) {
    //   router.push("/login");
    // }
  }, [user]);

  useEffect(() => {
    const getAllPosts = async () => {
      const data = await fetchPosts(user?._id);
      console.log(data);

      if (data) setPosts(data?.data.posts);
    };

    getAllPosts();
  }, [user]);

  const handleDeletePost = async () => {
    console.log(postId);
    const data = await removePost(postId);
    console.log(data);

    if (data?.data.success) {
      setIsPostRemoved(true);
    }
  };

  const handleDeleteModalClose = () => {
    setIsPostRemove(false);
  };

  useEffect(() => {
    if (user) document.title = `${user?.name} (${user?.username}) | Libertas`;
  }, [user]);

  return (
    <>
      <Stack direction="row" spacing={4} style={{ padding: "1rem 0" }}>
        <User />

        <div style={{ flex: 2 }}>
          <h2>Posts</h2>

          {posts?.length !== 0 ? (
            <Stack spacing={3} style={{ padding: "1rem 0" }}>
              {posts?.map((post) => (
                <Stack
                  key={post?._id}
                  style={{
                    backgroundColor: "#f3f3f3",
                    padding: 10,
                    borderRadius: "0.5rem",
                  }}
                  spacing={1}
                >
                  <h3>{post?.post.title}</h3>
                  <p>{post?.post.body}</p>
                  <div>
                    <Button
                      variant="contained"
                      color="error"
                      // onClick={() => handleDeletePost(post?._id)}
                      onClick={() => {
                        setIsPostRemove(true);
                        setPostId(post?._id);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </Stack>
              ))}
            </Stack>
          ) : (
            <Stack spacing={2} style={{ padding: "1rem 0" }}>
              <p>Oops! You do not have any posts!</p>
              <div>
                <Button
                  variant="contained"
                  onClick={() => router.push("/create-post")}
                >
                  Create a post now!
                </Button>
              </div>
            </Stack>
          )}

          <Snackbar
            open={isPostRemoved}
            message="Post removed successfully"
            autoHideDuration={3000}
          />

          <Modal
            open={isPostRemove}
            onClose={handleDeleteModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 500,
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                padding: 30,
              }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Delete post?
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Are you sure you want to delete your post? You cannot undo this.
              </Typography>
              <div>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDeletePost}
                >
                  Delete Post
                </Button>
              </div>
            </Box>
          </Modal>
        </div>
      </Stack>
    </>
  );
};

export default Profile;
