"use client";
import NewPost from "@/components/buttonComponents/NewPost";
import { GlobalContext } from "@/services/globalContext";
import { Container, Stack } from "@mui/material";
import React, { useContext, useEffect } from "react";

const Feed = () => {
  const { posts } = useContext(GlobalContext);

  useEffect(() => {
    document.title = "Home | Libertas";
  }, []);

  return (
    <Container style={{ paddingBottom: 20 }}>
      <NewPost />

      <Stack spacing={3} style={{ marginTop: 30 }}>
        {posts ? (
          posts?.map((post) => (
            <Stack
              key={post?._id}
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
          ))
        ) : (
          <p>You are all caught up!</p>
        )}
      </Stack>
    </Container>
  );
};

export default Feed;
