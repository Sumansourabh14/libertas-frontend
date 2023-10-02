"use client";
import DeletePostModal from "@/components/modalComponents/DeletePostModal";
import CommentInput from "@/components/postComponents/CommentInput";
import Comments from "@/components/postComponents/Comments";
import PostComponent from "@/components/postComponents/PostComponent";
import { relativeTime } from "@/components/utils/relativeTime";
import { GlobalContext } from "@/services/globalContext";
import { Container, Divider, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const Post = ({ params }) => {
  const [postData, setPostData] = useState(null);
  const [postedAgo, setPostedAgo] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [commentText, setCommentText] = useState("");
  const [isPostRemove, setIsPostRemove] = useState(false);
  // const [isPostRemoved, setIsPostRemoved] = useState(false);
  const [comments, setComments] = useState([]);

  const {
    fetchPost,
    editPost,
    removePost,
    upvoteAPost,
    downvoteAPost,
    createComment,
    fetchAllPosts,
    getCommentsByPostId,
    user,
  } = useContext(GlobalContext);

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
    let mounted = true;

    const fetchComments = async () => {
      const data = await getCommentsByPostId(postData?._id);
      // console.log(data);

      if (mounted) {
        setComments(data?.data?.data);
      }
    };

    fetchComments();

    return () => {
      mounted = false;
    };
  }, [postData]);

  useEffect(() => {
    document.title = `${postData?.post?.title} | Libertas`;
  }, [post, postData]);

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

  const handleDelete = () => {
    setIsPostRemove(true);
  };

  // useEffect(() => {
  //   console.log({ isEdit });
  // }, [isEdit]);

  const handleUpvote = async (postId) => {
    try {
      // Call the upvoteAPost function
      await upvoteAPost(postId);

      // Fetch the updated list of posts after upvoting (re-render)
      const updatedPost = await fetchPost(postId);
      setPostData(updatedPost?.data?.post);
    } catch (error) {
      console.error("Error upvoting post:", error);
    }
  };

  const handleDownvote = async (postId) => {
    try {
      // Call the downvoteAPost function
      await downvoteAPost(postId);

      // Fetch the updated list of posts after downvoting (re-render)
      const updatedPost = await fetchPost(postId);

      console.log(updatedPost);
      setPostData(updatedPost?.data?.post);
    } catch (error) {
      console.error("Error downvoting post:", error);
    }
  };

  const handleAddComment = async () => {
    if (!user) {
      router.push("/login");
    }

    await createComment(postData?._id, commentText);

    const data = await fetchPost(postData?._id);
    setPostData(data?.data?.post);
  };

  return (
    <Stack spacing={4} style={{ paddingBottom: 20 }}>
      <PostComponent
        key={postData?._id}
        post={postData}
        id={postData?._id}
        handleUpvote={() => handleUpvote(postData?._id)}
        handleDownvote={() => handleDownvote(postData?._id)}
        individualView={true}
        isEdit={isEdit}
        handleEdit={handleEdit}
        handleCancel={handleCancel}
        handleDelete={handleDelete}
        handleSave={handleSave}
        title={title}
        body={body}
        handleBody={(e) => setBody(e.target.value)}
        handleTitle={(e) => setTitle(e.target.value)}
      />

      <Container maxWidth="md" style={{ paddingLeft: 0 }}>
        <CommentInput
          commentText={commentText}
          handleCommentText={(e) => setCommentText(e.target.value)}
          handleAddComment={handleAddComment}
        />

        <Divider variant="fullWidth" style={{ padding: "0.875rem 0" }} />

        <Stack spacing={2} style={{ marginTop: 20 }}>
          <h3>
            {comments?.length === 1
              ? `1 comment`
              : `${comments?.length} comments`}
          </h3>

          <Comments comments={comments} />
        </Stack>
      </Container>

      {/* <Snackbar
        open={isPostRemoved}
        message="Post removed successfully"
        autoHideDuration={3000}
      /> */}

      <DeletePostModal
        title="Delete post?"
        body="Are you sure you want to delete your post? You cannot undo this."
        isPostRemove={isPostRemove}
        handleDeleteModalClose={handleDeleteModalClose}
        handleDeletePost={handleDeletePost}
      />
    </Stack>
  );
};

export default Post;
