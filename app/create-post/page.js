"use client";
import User from "@/components/User";
import Text from "@/components/postComponents/Text";
import { GlobalContext } from "@/services/globalContext";
import { storage } from "@/utils/firebase";
import { Container, Snackbar, Stack, useMediaQuery } from "@mui/material";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { v4 } from "uuid";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [body, setBody] = useState("");
  const [open, setOpen] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [postMessage, setPostMessage] = useState(false);

  const { postPost, user, loading } = useContext(GlobalContext);
  const mobileScreenSize = useMediaQuery("(max-width:600px)");

  const router = useRouter();

  const handleTextPost = async () => {
    const data = await postPost(title, body, imageUrl, videoUrl);

    if (data?.data?.success) setPostMessage("Your post is live!");

    router.push("/profile");
  };

  const handleImageFile = (e) => {
    if (e.type === "video/mp4") {
      setVideo(e);
    } else {
      setImage(e);
    }
  };

  const uploadMedia = async () => {
    try {
      setUploadLoading(true);
      if (image === null && video === null) {
        setUploadLoading(false);
        return;
      }

      let data;

      if (video) {
        const videoRef = ref(storage, `videos/${video.name + v4()}`);
        try {
          data = await uploadBytes(videoRef, video);
        } catch (uploadError) {
          throw uploadError;
        }
      } else if (image) {
        const imageRef = ref(storage, `posts/${image.name + v4()}`);
        try {
          data = await uploadBytes(imageRef, image);
        } catch (uploadError) {
          throw uploadError;
        }
      }

      if (data) {
        const url = await getDownloadURL(data.ref);
        if (video) {
          setVideoUrl(url);
          setUploadLoading(false);
        } else if (image) {
          setImageUrl(url);
          setUploadLoading(false);
        }
      } else {
        setUploadLoading(false);
      }
    } catch (error) {
      setUploadLoading(false);
    }
  };

  useEffect(() => {
    if (postMessage?.length !== undefined) setOpen(true);
  }, [postMessage]);

  useEffect(() => {
    document.title = "Create Post | Libertas";
  }, []);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  return (
    <>
      <Container style={{ paddingTop: 20 }}>
        <Stack direction="row" spacing={4} style={{ paddingBottom: "1rem" }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ marginBottom: "1rem" }}>Create Post</h1>
            <Text
              title={title}
              setTitle={setTitle}
              body={body}
              setBody={setBody}
              handleTextPost={handleTextPost}
              image={image}
              handleImageFile={handleImageFile}
              video={video}
              handleMediaUpload={uploadMedia}
              imageUrl={imageUrl}
              videoUrl={videoUrl}
              loading={loading}
              imageUploadLoading={uploadLoading}
            />
            <Snackbar
              open={open}
              message={postMessage}
              autoHideDuration={3000}
            />
          </div>

          {!mobileScreenSize && <User />}
        </Stack>
      </Container>
    </>
  );
};

export default CreatePost;
