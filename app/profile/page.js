"use client";
import User from "@/components/User";
import DeletePostModal from "@/components/modalComponents/DeletePostModal";
import PostComponent from "@/components/postComponents/PostComponent";
import { GlobalContext } from "@/services/globalContext";
import { Button, Snackbar, Stack } from "@mui/material";
import Link from "next/link";
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
      // console.log(data);

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
          <h2>Posts</h2>

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

          {/* <DeletePostModal
            isPostRemove={isPostRemove}
            handleDeleteModalClose={handleDeleteModalClose}
            handleDeletePost={handleDeletePost}
          /> */}
        </div>
        <User />
      </Stack>
    </>
  );
};

export default Profile;
