import { Container, Stack, useMediaQuery } from "@mui/material";
import NewPost from "../buttonComponents/NewPost";
import PostComponent from "./PostComponent";
import RecentPosts from "./RecentPosts";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/services/globalContext";
import InfiniteScroll from "react-infinite-scroll-component";

const FeedPresentation = ({ handleVote }) => {
  const { upvoteAPost, downvoteAPost, fetchAllPosts } =
    useContext(GlobalContext);
  const matches = useMediaQuery("(min-width:550px)");

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(4);
  const [currentCount, setCurrentCount] = useState(null);
  const [total, setTotal] = useState(null);

  const fetchPosts = async () => {
    const data = await fetchAllPosts(page);
    console.log(data?.data?.data);

    setPosts(data?.data?.data);
    setCurrentCount(data?.data?.currentLength);
    setTotal(data?.data?.total);
    setPage(page + 2);
  };

  useEffect(() => {
    fetchPosts();
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
            {/* {!!posts.length ? (
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
            )} */}

            <InfiniteScroll
              dataLength={posts?.length} //This is important field to render the next data
              next={fetchPosts}
              hasMore={currentCount !== total}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {posts.map((post) => (
                <PostComponent
                  key={post._id}
                  post={post}
                  id={post._id}
                  handleUpvote={() => handleVote(upvoteAPost, post._id)}
                  handleDownvote={() => handleVote(downvoteAPost, post._id)}
                  individualView={false}
                />
              ))}
            </InfiniteScroll>
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
