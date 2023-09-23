"use client";
import NewPost from "@/components/buttonComponents/NewPost";
import RecentPosts from "@/components/postComponents/RecentPosts";
import { relativeTime } from "@/components/utils/relativeTime";
import { GlobalContext } from "@/services/globalContext";
import { Container, Stack } from "@mui/material";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  const { fetchAllPosts } = useContext(GlobalContext);

  useEffect(() => {
    let mounted = true;

    async function fetchPosts() {
      const data = await fetchAllPosts();

      if (mounted) {
        setPosts(data?.data?.data);
      }
    }

    fetchPosts();

    return () => {
      mounted = false;
    };
  }, []);

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
              posts?.reverse()?.map((post) => (
                <Link key={post?._id} href={`/post/${post?._id}`}>
                  <Stack
                    spacing={2}
                    style={{
                      backgroundColor: "#f3f3f3",
                      padding: 12,
                      borderRadius: "0.5rem",
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={2}
                      justifyContent="space-between"
                    >
                      <p style={{ fontSize: "1rem", fontWeight: "600" }}>
                        {post?.author?.username}
                      </p>
                      <p style={{ fontSize: "0.875rem", fontWeight: "300" }}>
                        {relativeTime(Date.parse(post?.createdAt))}
                      </p>
                    </Stack>
                    <h3>{post?.post?.title}</h3>
                    <p style={{ fontSize: "0.9rem" }}>{post?.post?.body}</p>
                  </Stack>
                </Link>
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
