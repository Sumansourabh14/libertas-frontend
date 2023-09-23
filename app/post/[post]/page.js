"use client";
import DeletePostModal from "@/components/modalComponents/DeletePostModal";
import { relativeTime } from "@/components/utils/relativeTime";
import { GlobalContext } from "@/services/globalContext";
import { Button, Stack, TextField, TextareaAutosize } from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const Post = ({ params }) => {
  const [postData, setPostData] = useState(null);
  const [postedAgo, setPostedAgo] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isPostRemove, setIsPostRemove] = useState(false);
  // const [isPostRemoved, setIsPostRemoved] = useState(false);

  const { fetchPost, editPost, removePost, user } = useContext(GlobalContext);

  const { post } = params;
  const router = useRouter();

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

  useEffect(() => {
    console.log({ user });
  }, [user]);

  useEffect(() => {
    const timestamp = Date.parse(postData?.createdAt);

    const time = relativeTime(timestamp);
    setPostedAgo(time);

    setTitle(postData?.post?.title);
    setBody(postData?.post?.body);
  }, [postData]);

  const handleDeletePost = async () => {
    const data = await removePost(post);

    if (data?.data.success) {
      // setIsPostRemoved(true);
      router.back();
    }
  };

  const handleDeleteModalClose = () => {
    setIsPostRemove(false);
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleCancel = () => {
    setIsEdit(false);
  };

  const handleSave = async () => {
    const isEdited = await editPost(post, title, body);
    if (isEdited?.data.success) {
      setPostData({
        ...postData,
        post: {
          ...postData.post,
          title: title,
          body: body,
        },
      });
      setIsEdit(false);
    }
  };

  useEffect(() => {
    console.log({ isEdit });
  }, [isEdit]);

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
        {isEdit ? (
          <Stack
            style={{
              backgroundColor: "#f3f3f3",
              borderRadius: 10,
            }}
            spacing={2}
          >
            <TextField
              type="text"
              placeholder="Enter title"
              fullWidth
              size="small"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextareaAutosize
              aria-label="textarea for text body"
              placeholder="Enter text"
              minRows={10}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              style={{
                width: "100%",
                fontFamily: "inherit",
                fontSize: "1rem",
                padding: 10,
              }}
            />
          </Stack>
        ) : (
          <>
            <h2 style={{ fontSize: "1.7rem" }}>{postData?.post?.title}</h2>
            <p style={{ fontSize: "0.9rem" }}>{postData?.post?.body}</p>
          </>
        )}
        <Stack>
          {!isEdit ? (
            user?._id === postData?.author?._id && (
              <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={handleEdit}>
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    setIsPostRemove(true);
                  }}
                >
                  Delete
                </Button>
              </Stack>
            )
          ) : (
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" color="error" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleSave}>
                Save
              </Button>
            </Stack>
          )}
        </Stack>
      </Stack>

      {/* <Snackbar
        open={isPostRemoved}
        message="Post removed successfully"
        autoHideDuration={3000}
      /> */}

      <DeletePostModal
        isPostRemove={isPostRemove}
        handleDeleteModalClose={handleDeleteModalClose}
        handleDeletePost={handleDeletePost}
      />
    </div>
  );
};

export default Post;
