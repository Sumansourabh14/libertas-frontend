"use client";
import Text from "@/components/postComponents/Text";
import { GlobalContext } from "@/services/globalContext";
import { Snackbar } from "@mui/material";
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
  };

  useEffect(() => {
    if (postMessage?.length !== undefined) setOpen(true);
  }, [postMessage]);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  return (
    <>
      <h1>Create a post</h1>
      <Text
        title={title}
        setTitle={setTitle}
        body={body}
        setBody={setBody}
        handleTextPost={handleTextPost}
      />
      <Snackbar open={open} message={postMessage} autoHideDuration={3000} />
    </>
  );
};

export default CreatePost;
