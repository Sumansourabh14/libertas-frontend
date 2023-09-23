"use client";
import User from "@/components/User";
import DeletePostModal from "@/components/modalComponents/DeletePostModal";
import { GlobalContext } from "@/services/globalContext";
import { Button, Snackbar, Stack } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [postId, setPostId] = useState(null);
  const [isPostRemoved, setIsPostRemoved] = useState(false);
  const [isPostRemove, setIsPostRemove] = useState(false);

  const { user, fetchPosts, removePost } = useContext(GlobalContext);
  const router = useRouter();

  useEffect(() => {
    console.log(
      new Date(user?.createdAt).toDateString().split(" ").splice(1, 3).join(" ")
    );
    console.log(new Date(user?.createdAt).toDateString());

    // if (!user) {
    //   router.push("/login");
    // }
  }, [user]);

  useEffect(() => {
    const getAllPosts = async () => {
      const data = await fetchPosts(user?._id);
      // console.log(data);

      if (data) setPosts(data?.data.posts);
    };

    getAllPosts();
  }, [user]);

  const handleDeletePost = async () => {
    // console.log(postId);
    const data = await removePost(postId);
    // console.log(data);

    if (data?.data.success) {
      setIsPostRemoved(true);
    }
  };

  const handleDeleteModalClose = () => {
    setIsPostRemove(false);
  };

  useEffect(() => {
    if (user) document.title = `${user?.name} (${user?.username}) | Libertas`;
  }, [user]);

  return (
    <>
      <Stack direction="row" spacing={4} style={{ padding: "1rem 0" }}>
        <User />

        <div style={{ flex: 2 }}>
          <h2>Posts</h2>

          {posts?.length !== 0 ? (
            <Stack spacing={3} style={{ padding: "1rem 0" }}>
              {posts?.reverse()?.map((post) => (
                <Link key={post?._id} href={`/post/${post?._id}`}>
                  <Stack
                    style={{
                      backgroundColor: "#f3f3f3",
                      padding: 10,
                      borderRadius: "0.5rem",
                    }}
                    spacing={1}
                  >
                    <h3>{post?.post.title}</h3>
                    <p>{post?.post.body}</p>
                    <div>
                      <Button
                        variant="contained"
                        color="error"
                        // onClick={() => handleDeletePost(post?._id)}
                        onClick={() => {
                          setIsPostRemove(true);
                          setPostId(post?._id);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </Stack>
                </Link>
              ))}
            </Stack>
          ) : (
            <Stack spacing={2} style={{ padding: "1rem 0" }}>
              <p>Oops! You do not have any posts!</p>
              <div>
                <Button
                  variant="contained"
                  onClick={() => router.push("/create-post")}
                >
                  Create a post now!
                </Button>
              </div>
            </Stack>
          )}

          <Snackbar
            open={isPostRemoved}
            message="Post removed successfully"
            autoHideDuration={3000}
          />

          <DeletePostModal
            isPostRemove={isPostRemove}
            handleDeleteModalClose={handleDeleteModalClose}
            handleDeletePost={handleDeletePost}
          />
        </div>
      </Stack>
    </>
  );
};

export default Profile;
