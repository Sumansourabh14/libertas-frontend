"use client";
import NewPost from "@/components/buttonComponents/NewPost";
import PostComponent from "@/components/postComponents/PostComponent";
import RecentPosts from "@/components/postComponents/RecentPosts";
import { GlobalContext } from "@/services/globalContext";
import { Container, Stack, useMediaQuery } from "@mui/material";
import { useContext, useEffect, useState } from "react";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  const { fetchAllPosts, upvoteAPost, downvoteAPost } =
    useContext(GlobalContext);
  const matches = useMediaQuery("(min-width:550px)");

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  useEffect(() => {
    let mounted = true;

    async function fetchPosts() {
      const data = await fetchAllPosts();

      if (mounted) {
        setPosts(data?.data?.data?.reverse());
      }
    }

    fetchPosts();

    return () => {
      mounted = false;
    };
  }, []);

  // Function to handle upvoting a post
  const handleUpvote = async (postId) => {
    try {
      // Call the upvoteAPost function
      await upvoteAPost(postId);

      // Fetch the updated list of posts after upvoting (re-render)
      const updatedPosts = await fetchAllPosts();
      setPosts(updatedPosts?.data?.data?.reverse());
    } catch (error) {
      console.error("Error upvoting post:", error);
    }
  };

  // Function to handle downvoting a post
  const handleDownvote = async (postId) => {
    try {
      // Call the upvoteAPost function
      await downvoteAPost(postId);

      // Fetch the updated list of posts after upvoting (re-render)
      const updatedPosts = await fetchAllPosts();
      setPosts(updatedPosts?.data?.data?.reverse());
    } catch (error) {
      console.error("Error downvoting post:", error);
    }
  };

  useEffect(() => {
    document.title = "Home | Libertas";
  }, []);

  return (
    <Container
      style={{
        paddingBottom: 20,
      }}
    >
      <Stack direction="row" spacing={3}>
        <Stack>
          <div>
            <NewPost />
          </div>

          <Stack spacing={3} style={{ marginTop: 24 }}>
            {posts?.length > 0 ? (
              posts?.map((post) => (
                <PostComponent
                  key={post?._id}
                  post={post}
                  id={post?._id}
                  handleUpvote={() => handleUpvote(post?._id)}
                  handleDownvote={() => handleDownvote(post?._id)}
                  individualView={false}
                />
              ))
            ) : (
              <p>You are all caught up!</p>
            )}
          </Stack>
        </Stack>

        {matches && (
          <div style={{ flex: 1 }}>
            <RecentPosts />
          </div>
        )}
      </Stack>
    </Container>
  );
};

export default Feed;
