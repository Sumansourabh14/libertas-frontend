import { Container, Stack, useMediaQuery } from "@mui/material";
import NewPost from "../buttonComponents/NewPost";
import PostComponent from "./PostComponent";
import RecentPosts from "./RecentPosts";
import { useContext } from "react";
import { GlobalContext } from "@/services/globalContext";

const FeedPresentation = ({ posts, handleVote }) => {
  const { upvoteAPost, downvoteAPost } = useContext(GlobalContext);
  const matches = useMediaQuery("(min-width:550px)");

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

export default FeedPresentation;
