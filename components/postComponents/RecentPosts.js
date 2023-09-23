import { Stack } from "@mui/material";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { relativeTime } from "../utils/relativeTime";
import { GlobalContext } from "@/services/globalContext";

const RecentPosts = () => {
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

  return (
    posts?.length > 0 && (
      <Stack
        style={{
          width: 240,
          backgroundColor: "#f3f3f3",
          padding: 12,
          borderRadius: "0.4rem",
        }}
      >
        <Stack spacing={2}>
          <h4>Recent Posts</h4>

          {posts?.length > 0 &&
            posts?.reverse()?.map((post) => (
              <Link key={post?._id} href={`/post/${post?._id}`}>
                <Stack
                  spacing={2}
                  style={{
                    backgroundColor: "#fff",
                    padding: 12,
                    borderRadius: "0.5rem",
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <p style={{ fontSize: "0.8rem", fontWeight: "600" }}>
                      {post?.author?.username}
                    </p>
                    <p style={{ fontSize: "0.75rem", fontWeight: "300" }}>
                      {relativeTime(Date.parse(post?.createdAt))}
                    </p>
                  </Stack>
                  <h5>{post?.post?.title}</h5>
                </Stack>
              </Link>
            ))}
        </Stack>
      </Stack>
    )
  );
};

export default RecentPosts;