"use client";
import { GlobalContext } from "@/services/globalContext";
import { Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const { user, fetchPosts } = useContext(GlobalContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  useEffect(() => {
    const getAllPosts = async () => {
      const data = await fetchPosts(user?._id);
      console.log(data);

      if (data) setPosts(data?.data.posts);
    };

    getAllPosts();
  }, [user]);

  return (
    <div>
      <h1>Hi, {user?.name}!</h1>

      <h2>Posts</h2>

      {posts && (
        <Stack spacing={3}>
          {posts.map((post) => (
            <div key={post?._id}>
              <h3>{post?.post.title}</h3>
              <p>{post?.post.body}</p>
            </div>
          ))}
        </Stack>
      )}
    </div>
  );
};

export default Profile;
