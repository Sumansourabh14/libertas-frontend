"use client";
import User from "@/components/User";
import Text from "@/components/postComponents/Text";
import { GlobalContext } from "@/services/globalContext";
import { storage } from "@/utils/firebase";
import { Container, Snackbar, Stack } from "@mui/material";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { v4 } from "uuid";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [body, setBody] = useState("");
  const [open, setOpen] = useState(false);
  const [postMessage, setPostMessage] = useState(false);

  const { postPost, user } = useContext(GlobalContext);

  const router = useRouter();

  const handleTextPost = async () => {
    const data = await postPost(title, body, imageUrl);

    if (data?.data?.success) setPostMessage("Your post is live!");

    router.push("/profile");
  };

  const handleImageFile = (e) => {
    setImage(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (image === null) return;

    const imageRef = ref(storage, `posts/${image.name + v4()}`);
    const data = await uploadBytes(imageRef, image);
    console.log(data);

    if (data) {
      alert("Image uploaded!");
      const url = await getDownloadURL(data.ref);
      setImageUrl(url);
    }
  };

  useEffect(() => {
    console.log(imageUrl);
  }, [imageUrl]);

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
            <h1 style={{ marginBottom: "1rem" }}>Create a post</h1>
            <Text
              title={title}
              setTitle={setTitle}
              body={body}
              setBody={setBody}
              handleTextPost={handleTextPost}
              image={image}
              handleImageFile={handleImageFile}
              handleImageUpload={uploadImage}
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
