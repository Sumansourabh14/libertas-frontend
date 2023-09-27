"use client";
import NewPost from "@/components/buttonComponents/NewPost";
import RecentPosts from "@/components/postComponents/RecentPosts";
import { relativeTime } from "@/components/utils/relativeTime";
import { GlobalContext } from "@/services/globalContext";
import { Container, IconButton, Stack } from "@mui/material";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  const { fetchAllPosts, upvoteAPost, user } = useContext(GlobalContext);

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

  useEffect(() => {
    document.title = "Home | Libertas";
  }, []);

  return (
    <Container style={{ paddingBottom: 20 }}>
      <Stack direction="row" spacing={3}>
        <Stack>
          <div>
            <NewPost />
          </div>

          <Stack spacing={3} style={{ marginTop: 24 }}>
            {posts?.length > 0 ? (
              posts?.map((post) => (
                <Stack key={post?._id}>
                  <Stack
                    spacing={2}
                    style={{
                      backgroundColor: "#f3f3f3",
                      padding: 12,
                      borderRadius: "0.5rem",
                    }}
                  >
                    <Stack direction="row" spacing={3}>
                      <Stack alignItems="center">
                        <IconButton onClick={() => handleUpvote(post?._id)}>
                          {post?.upvotes?.includes(user?._id) ? (
                            <ThumbUpIcon />
                          ) : (
                            <ThumbUpOutlinedIcon />
                          )}
                        </IconButton>

                        <p>{post?.upvotes?.length - post?.downvotes?.length}</p>

                        <IconButton>
                          {post?.downvotes?.includes(user?._id) ? (
                            <ThumbDownIcon />
                          ) : (
                            <ThumbDownOutlinedIcon />
                          )}
                        </IconButton>
                      </Stack>
                      <Link key={post?._id} href={`/post/${post?._id}`}>
                        <Stack spacing={2}>
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            spacing={2}
                          >
                            <p style={{ fontSize: "1rem", fontWeight: "600" }}>
                              {post?.author?.username}
                            </p>
                            <p
                              style={{
                                fontSize: "0.875rem",
                                fontWeight: "300",
                              }}
                            >
                              {relativeTime(Date.parse(post?.createdAt))}
                            </p>
                          </Stack>
                          <h3>{post?.post?.title}</h3>
                          <p style={{ fontSize: "0.9rem" }}>
                            {post?.post?.body}
                          </p>
                        </Stack>
                      </Link>
                    </Stack>
                  </Stack>
                </Stack>
              ))
            ) : (
              <p>You are all caught up!</p>
            )}
          </Stack>
        </Stack>

        <div style={{ flex: 1 }}>
          <RecentPosts />
        </div>
      </Stack>
    </Container>
  );
};

export default Feed;
