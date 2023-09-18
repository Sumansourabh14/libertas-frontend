"use client";
import User from "@/components/User";
import Text from "@/components/postComponents/Text";
import { GlobalContext } from "@/services/globalContext";
import { Container, Snackbar, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [open, setOpen] = useState(false);
  const [postMessage, setPostMessage] = useState(false);

  const { postPost, user } = useContext(GlobalContext);

  const router = useRouter();

  const handleTextPost = async () => {
    const data = await postPost(title, body);

    if (data?.data?.success) setPostMessage("Your post is live!");

    router.push("/profile");
  };

  useEffect(() => {
    if (postMessage?.length !== undefined) setOpen(true);
  }, [postMessage]);

  useEffect(() => {
    document.title = "Create a post | Libertas";
  }, []);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  return (
    <>
      <Container>
        <Stack direction="row" spacing={4} style={{ paddingBottom: "1rem" }}>
          <div style={{ flex: 1 }}>
            <h1>Create a post</h1>
            <Text
              title={title}
              setTitle={setTitle}
              body={body}
              setBody={setBody}
              handleTextPost={handleTextPost}
            />
            <Snackbar
              open={open}
              message={postMessage}
              autoHideDuration={3000}
            />
          </div>

          <User />
        </Stack>
      </Container>
    </>
  );
};

export default CreatePost;
