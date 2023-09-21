"use client";
import { GlobalContext } from "@/services/globalContext";
import { Stack } from "@mui/material";
import { useContext, useEffect, useState } from "react";

const Post = ({ params }) => {
  const [postData, setPostData] = useState(null);
  const [postedAgo, setPostedAgo] = useState(null);

  const { fetchPost } = useContext(GlobalContext);

  const { post } = params;

  useEffect(() => {
    let mounted = true;

    async function fetchPostData() {
      const data = await fetchPost(post);
      console.log(data?.data?.post);

      if (mounted) {
        setPostData(data?.data?.post);
      }
    }

    fetchPostData();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    document.title = `${postData?.post?.title} | Libertas`;
  }, [post, postData]);

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
    const timestamp = Date.parse(postData?.createdAt);

    const time = timeAgo(timestamp);
    setPostedAgo(time);
  }, [postData]);

  return (
    <div>
      <Stack
        spacing={2}
        style={{
          backgroundColor: "#f3f3f3",
          padding: 12,
          borderRadius: "0.5rem",
        }}
      >
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <p style={{ fontSize: "1rem", fontWeight: "600" }}>
            {postData?.author?.username}
          </p>
          {postedAgo && (
            <p style={{ fontSize: "0.875rem", fontWeight: "300" }}>
              {postedAgo}
            </p>
          )}
        </Stack>
        <h2 style={{ fontSize: "1.7rem" }}>{postData?.post?.title}</h2>
        <p style={{ fontSize: "0.9rem" }}>{postData?.post?.body}</p>
      </Stack>
    </div>
  );
};

export default Post;
