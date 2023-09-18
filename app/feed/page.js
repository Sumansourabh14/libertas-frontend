"use client";
import NewPost from "@/components/buttonComponents/NewPost";
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
      <NewPost />

      <Stack spacing={3} style={{ marginTop: 30 }}>
        {posts ? (
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
                <h3>{post?.post?.title}</h3>
                <p>{post?.post?.body}</p>
              </Stack>
            </Link>
          ))
        ) : (
          <p>You are all caught up!</p>
        )}
      </Stack>
    </Container>
  );
};

export default Feed;
