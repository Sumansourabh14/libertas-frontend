"use client";
import NewPost from "@/components/buttonComponents/NewPost";
import PostComponent from "@/components/postComponents/PostComponent";
import RecentPosts from "@/components/postComponents/RecentPosts";
import { GlobalContext } from "@/services/globalContext";
import useFetchPosts from "@/utils/customHooks/useFetchPosts";
import { Container, Stack, useMediaQuery } from "@mui/material";
import { useContext, useEffect } from "react";

const Feed = () => {
  const { upvoteAPost, downvoteAPost } = useContext(GlobalContext);

  const matches = useMediaQuery("(min-width:550px)");

  // fetching all the posts from the custom hook
  const [posts, updatePosts] = useFetchPosts();

  const handleVote = async (method, postId) => {
    try {
      // Call the upvote/downvote function
      await method(postId);

      // Fetch the updated list of posts after upvoting/downvoting (re-render)
      await updatePosts();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    document.title = "What's Happening | Libertas";
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
            {!!posts.length ? (
              posts.map((post) => (
                <PostComponent
                  key={post._id}
                  post={post}
                  id={post._id}
                  handleUpvote={() => handleVote(upvoteAPost, post._id)}
                  handleDownvote={() => handleVote(downvoteAPost, post._id)}
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
