import { GlobalContext } from "@/services/globalContext";
import { Container, Stack, useMediaQuery } from "@mui/material";
import { useContext } from "react";
import NewPost from "../buttonComponents/NewPost";
import PostSkeletonsGroup from "../skeletonComponents/PostSkeletonsGroup";
import PostComponent from "./PostComponent";
import RecentPosts from "./RecentPosts";

const FeedPresentation = ({ posts, handleVote }) => {
  const { upvoteAPost, downvoteAPost, postsLoading } =
    useContext(GlobalContext);
  const matches = useMediaQuery("(min-width:950px)");

  return (
    <Container
      style={{
        paddingBottom: 20,
      }}
    >
      <Stack direction="row" spacing={4} justifyContent="space-between">
        <Stack sx={{ width: "100%" }}>
          <div>
            <NewPost />
          </div>

          <Stack spacing={3} style={{ marginTop: 24 }}>
            {postsLoading ? (
              <PostSkeletonsGroup />
            ) : (
              <>
                {posts.length > 0 ? (
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
                  <PostSkeletonsGroup />
                )}
              </>
            )}
          </Stack>
        </Stack>

        {matches && (
          <div>
            <RecentPosts />
          </div>
        )}
      </Stack>
    </Container>
  );
};

export default FeedPresentation;
