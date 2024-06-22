import { GlobalContext } from "@/services/globalContext";
import { Avatar, Stack } from "@mui/material";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { relativeTime } from "../utils/relativeTime";
import CircleIcon from "@mui/icons-material/Circle";

const RecentPosts = () => {
  const [posts, setPosts] = useState([]);

  const { fetchAllPosts } = useContext(GlobalContext);

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

  return (
    posts?.length > 0 && (
      <Stack
        style={{
          width: 240,
          backgroundColor: "#000",
          padding: 12,
          borderRadius: "0.4rem",
        }}
      >
        <Stack spacing={2}>
          <h4>Recent Posts</h4>

          {posts?.length > 0 &&
            posts?.slice(0, 4)?.map((post) => (
              <Link
                key={post?._id}
                href={`/post/${post?._id}`}
                style={{ textDecoration: "none" }}
              >
                <Stack
                  spacing={2}
                  style={{
                    backgroundColor: "#3a3a3a",
                    padding: 12,
                    borderRadius: "0.5rem",
                  }}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar
                      alt={post?.author?.name}
                      src={post?.author?.avatar ? post?.author?.avatar : ""}
                      sx={{ width: 20, height: 20 }}
                    />
                    <p style={{ fontSize: "0.8rem", fontWeight: "600" }}>
                      {post?.author?.username}
                    </p>
                    <CircleIcon style={{ fontSize: "6px" }} />
                    <p style={{ fontSize: "0.75rem", fontWeight: "300" }}>
                      {relativeTime(Date.parse(post?.createdAt))}
                    </p>
                  </Stack>
                  <h5>{post?.post?.title}</h5>
                  {post?.comments?.length !== 0 ? (
                    post?.comments?.length === 1 ? (
                      <p
                        style={{
                          fontSize: "0.7rem",
                          fontWeight: "300",
                        }}
                      >
                        1 comment
                      </p>
                    ) : (
                      <p
                        style={{
                          fontSize: "0.7rem",
                          fontWeight: "300",
                        }}
                      >
                        {post?.comments?.length} comments
                      </p>
                    )
                  ) : (
                    <p
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: "300",
                      }}
                    >
                      0 comments
                    </p>
                  )}
                </Stack>
              </Link>
            ))}
        </Stack>
      </Stack>
    )
  );
};

export default RecentPosts;
