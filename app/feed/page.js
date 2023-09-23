"use client";
import NewPost from "@/components/buttonComponents/NewPost";
import GlobalSideBar from "@/components/drawerComponents/GlobalSideBar";
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

  // calculate relative time
  function timeAgo(timestamp) {
    const date = new Date(timestamp);
    const currentDate = new Date();

    // convert milli-seconds into seconds
    const secondsDifference = Math.floor((currentDate - date) / 1000);
    if (secondsDifference < 60) {
      return `${secondsDifference} ${
        secondsDifference === 1 ? "second" : "seconds"
      } ago`;
    }

    // convert seconds into minutes
    const minutesDifference = Math.floor(secondsDifference / 60);
    if (minutesDifference < 60) {
      return `${minutesDifference} ${
        minutesDifference === 1 ? "minute" : "minutes"
      } ago`;
    }

    const hoursDifference = Math.floor(minutesDifference / 60);
    if (hoursDifference < 24) {
      return `${hoursDifference} ${
        hoursDifference === 1 ? "hour" : "hours"
      } ago`;
    }

    const daysDifference = Math.floor(hoursDifference / 24);
    if (daysDifference < 30) {
      return `${daysDifference} ${daysDifference === 1 ? "day" : "days"} ago`;
    }

    const monthsDifference = Math.floor(daysDifference / 30);
    if (monthsDifference < 12) {
      return `${monthsDifference} ${
        monthsDifference === 1 ? "month" : "months"
      } ago`;
    }

    const yearsDifference = Math.floor(monthsDifference / 12);
    return `${yearsDifference} ${yearsDifference === 1 ? "year" : "years"} ago`;
  }

  useEffect(() => {
    document.title = "Home | Libertas";
  }, []);

  return (
    <Container style={{ paddingBottom: 20 }}>
      <Stack>
        <div>
          <NewPost />
        </div>

        <Stack spacing={3} style={{ marginTop: 30 }}>
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
                      {timeAgo(Date.parse(post?.createdAt))}
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
    </Container>
  );
};

export default Feed;
