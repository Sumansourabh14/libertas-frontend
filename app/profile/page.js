"use client";
import User from "@/components/User";
import PostComponent from "@/components/postComponents/PostComponent";
import { GlobalContext } from "@/services/globalContext";
import { faFaceSadTear } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Snackbar, Stack, useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [postId, setPostId] = useState(null);
  const [isPostRemoved, setIsPostRemoved] = useState(false);
  const [isPostRemove, setIsPostRemove] = useState(false);

  const {
    user,
    fetchPosts,
    removePost,
    fetchPost,
    upvoteAPost,
    downvoteAPost,
  } = useContext(GlobalContext);
  const router = useRouter();
  const mobileScreenSize = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    console.log(
      new Date(user?.createdAt).toDateString().split(" ").splice(1, 3).join(" ")
    );
    console.log(new Date(user?.createdAt).toDateString());

    if (!user) {
      router.push("/login");
    }
  }, [user]);

  useEffect(() => {
    const getAllPosts = async () => {
      const data = await fetchPosts(user?._id);
      console.log(data);

      if (data) setPosts(data?.data.posts?.reverse());
    };

    getAllPosts();
  }, [user]);

  const handleDeletePost = async () => {
    // console.log(postId);
    const data = await removePost(postId);
    // console.log(data);

    if (data?.data.success) {
      setIsPostRemoved(true);
    }
  };

  const handleDeleteModalClose = () => {
    setIsPostRemove(false);
  };

  const handleUpvote = async (postId) => {
    try {
      // Call the upvoteAPost function
      await upvoteAPost(postId);

      // Fetch the updated list of posts after upvoting (re-render)
      const updatedPosts = await fetchPosts(user?._id);
      setPosts(updatedPosts?.data?.posts?.reverse());
    } catch (error) {
      console.error("Error upvoting post:", error);
    }
  };

  const handleDownvote = async (postId) => {
    try {
      // Call the downvoteAPost function
      await downvoteAPost(postId);

      // Fetch the updated list of posts after downvoting (re-render)
      const updatedPosts = await fetchPosts(user?._id);
      setPosts(updatedPosts?.data?.posts?.reverse());
    } catch (error) {
      console.error("Error downvoting post:", error);
    }
  };

  useEffect(() => {
    if (user) document.title = `${user?.name} (${user?.username}) | Libertas`;
  }, [user]);

  return (
    <>
      <Stack
        direction="row"
        spacing={4}
        justifyContent="space-between"
        style={{ padding: "1rem 0" }}
      >
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: "2rem", marginBottom: 20 }}>
            Hi {user?.name}!
          </h1>
          <h2>Your Posts</h2>

          {posts?.length !== 0 ? (
            <Stack spacing={3} style={{ padding: "1rem 0" }}>
              {posts?.map((post) => (
                <PostComponent
                  key={post?._id}
                  post={post}
                  id={post?._id}
                  handleUpvote={() => handleUpvote(post?._id)}
                  handleDownvote={() => handleDownvote(post?._id)}
                  individualView={false}
                />
              ))}
            </Stack>
          ) : (
            <Stack
              spacing={2}
              justifyContent="center"
              alignItems="center"
              style={{
                padding: "1rem 0",
                minHeight: "300px",
                textAlign: "center",
              }}
            >
              <FontAwesomeIcon icon={faFaceSadTear} size="4x" />
              <p style={{ fontSize: "2rem" }}>
                Oops! You do not have any posts!
              </p>
              <div>
                <Button
                  variant="outlined"
                  onClick={() => router.push("/create-post")}
                  style={{
                    borderRadius: "0.4rem",
                    padding: "0.5rem 2rem",
                    fontWeight: "600",
                    textTransform: "none",
                    borderColor: "#000",
                    color: "#000",
                  }}
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

          {/* <DeletePostModal
            isPostRemove={isPostRemove}
            handleDeleteModalClose={handleDeleteModalClose}
            handleDeletePost={handleDeletePost}
          /> */}
        </div>
        {!mobileScreenSize && <User />}
      </Stack>
    </>
  );
};

export default Profile;
