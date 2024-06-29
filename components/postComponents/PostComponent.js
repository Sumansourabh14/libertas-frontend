import { GlobalContext } from "@/services/globalContext";
import { openSans } from "@/theme/fonts";
import CancelIcon from "@mui/icons-material/Cancel";
import CircleIcon from "@mui/icons-material/Circle";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Button,
  IconButton,
  Snackbar,
  Stack,
  TextField,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import OptionButton from "../buttonComponents/OptionButton";
import TextEditor from "../textEditor/TextEditor";
import { relativeTime } from "../utils/relativeTime";
import { colors } from "@/styles/colors";
import ReportPostPopup from "../dialogComponents/ReportPostPopup";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FlagIcon from "@mui/icons-material/Flag";
import { useRouter } from "next/navigation";

const PostComponent = ({
  id,
  post,
  handleUpvote,
  handleDownvote,
  isEdit,
  handleEdit,
  handleDelete,
  handleCancel,
  handleSave,
  individualView,
  title,
  body,
  handleTitle,
  handleBody,
  path,
}) => {
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [openReportPopUp, setOpenReportPopUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reportMessage, setReportMessage] = useState("");
  const [comment, setComment] = useState("");
  const [reason, setReason] = useState("");

  const { user, reportPost, loading, savePost } = useContext(GlobalContext);
  const mobileScreenSize = useMediaQuery("(max-width:600px)");
  const router = useRouter();

  const copyLink = () => {
    try {
      setIsLoading(true);
      setIsLinkCopied(false);

      const url = `https://libertas-vert.vercel.app${path}`;
      navigator.clipboard.writeText(url);

      setIsLoading(false);
      setIsLinkCopied(true);
    } catch (error) {
      setIsLoading(false);
      setIsLinkCopied(false);
    }
  };

  const handleReportPopUp = () => {
    if (!user) {
      router.push("/login");
    }

    setOpenReportPopUp(true);
  };

  const handleReportPopUpClose = () => {
    setOpenReportPopUp(false);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const handleSubmitReport = async () => {
    setReportMessage("");
    const response = await reportPost(post?._id, user?._id, reason, comment);

    if (response.status === 201) {
      setReportMessage(
        "Thank you for reporting this content. We take reports seriously and will investigate accordingly. Your feedback helps us maintain a safer community."
      );
    }
  };

  const handleSavePost = async () => {
    if (!user) {
      router.push("/login");
    }

    const response = await savePost(post?._id);
  };

  return (
    <Stack key={id}>
      {!post?.reportedByUsers?.includes(user?._id) && (
        <Stack
          spacing={2}
          style={{
            backgroundColor: "#000",
            padding: 12,
          }}
        >
          <Stack direction="row" spacing={3}>
            <Stack alignItems="center">
              <IconButton onClick={handleUpvote}>
                {post?.upvotes?.includes(user?._id) ? (
                  <ThumbUpIcon />
                ) : (
                  <ThumbUpOutlinedIcon />
                )}
              </IconButton>

              <p>{post?.upvotes?.length - post?.downvotes?.length}</p>

              <IconButton onClick={handleDownvote}>
                {post?.downvotes?.includes(user?._id) ? (
                  <ThumbDownIcon />
                ) : (
                  <ThumbDownOutlinedIcon />
                )}
              </IconButton>
            </Stack>
            {individualView ? (
              <Stack
                spacing={2}
                style={{
                  width: "100%",
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar
                    alt={post?.author?.name}
                    src={post?.author?.avatar ? post?.author?.avatar : ""}
                    sx={{ width: 40, height: 40 }}
                  />
                  <p style={{ fontSize: "1rem", fontWeight: "600" }}>
                    {post?.author?.username}
                  </p>
                  <CircleIcon style={{ fontSize: "6px" }} />
                  <p
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: "300",
                    }}
                  >
                    {relativeTime(Date.parse(post?.createdAt))}
                  </p>
                </Stack>

                <>
                  {isEdit ? (
                    <Stack
                      style={{
                        borderRadius: 10,
                      }}
                      spacing={2}
                    >
                      <TextField
                        type="text"
                        placeholder="Enter title*"
                        fullWidth
                        size="small"
                        value={title}
                        onChange={handleTitle}
                      />
                      <TextEditor value={body} setValue={handleBody} />
                    </Stack>
                  ) : (
                    <>
                      <h2
                        className={openSans.className}
                        style={{
                          fontSize: mobileScreenSize ? "1.2rem" : "1.7rem",
                        }}
                      >
                        {post?.post?.title}
                      </h2>
                      {post?.post?.imageUrl && (
                        <Image
                          src={post?.post?.imageUrl}
                          alt="some image alt text"
                          width={640}
                          height={335}
                          style={{ maxWidth: "100%", height: "auto" }}
                        />
                      )}
                      <div
                        dangerouslySetInnerHTML={{ __html: post?.post?.body }}
                      />
                      {post?.comments?.length !== 0 ? (
                        post?.comments?.length === 1 ? (
                          <p
                            style={{
                              fontSize: "0.9rem",
                              fontWeight: "300",
                              color: "gray",
                            }}
                          >
                            1 comment
                          </p>
                        ) : (
                          <p
                            style={{
                              fontSize: "0.9rem",
                              fontWeight: "300",
                              color: "gray",
                            }}
                          >
                            {post?.comments?.length} comments
                          </p>
                        )
                      ) : (
                        <p
                          style={{
                            fontSize: "0.9rem",
                            fontWeight: "300",
                            color: "gray",
                          }}
                        >
                          0 comments
                        </p>
                      )}
                    </>
                  )}
                  <Stack>
                    {!isEdit ? (
                      user?._id === post?.author?._id && (
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Stack
                            direction="row"
                            spacing={2}
                            style={{
                              padding: 2,
                            }}
                          >
                            <OptionButton
                              title="Edit"
                              icon={<EditIcon />}
                              handleClick={handleEdit}
                            />
                            <OptionButton
                              title="Delete"
                              icon={<DeleteIcon />}
                              handleClick={handleDelete}
                              bgColor="red"
                            />
                          </Stack>
                        </Stack>
                      )
                    ) : (
                      <Stack
                        direction="row"
                        spacing={2}
                        style={{ marginTop: 40 }}
                      >
                        <OptionButton
                          title="Cancel"
                          icon={<CancelIcon />}
                          handleClick={handleCancel}
                          bgColor="red"
                        />
                        <OptionButton
                          title="Save"
                          icon={<SaveIcon />}
                          handleClick={handleSave}
                        />
                      </Stack>
                    )}
                  </Stack>
                </>

                <Stack direction="row" gap={2} alignItems={"center"}>
                  <div>
                    <LoadingButton
                      loading={isLoading}
                      variant="contained"
                      onClick={copyLink}
                      startIcon={<ContentCopyIcon />}
                      sx={{
                        textTransform: "capitalize",
                        backgroundColor: "#FFFFFF",
                        fontWeight: "600",
                        borderRadius: "0rem",
                      }}
                    >
                      Copy link
                    </LoadingButton>
                  </div>

                  {user?._id !== post?.author?._id && (
                    <Stack gap={2} direction="row">
                      <LoadingButton
                        variant="contained"
                        loading={loading}
                        onClick={handleSavePost}
                        sx={{
                          textTransform: "capitalize",
                          backgroundColor: "#FFFFFF",
                          fontWeight: "600",
                          borderRadius: "0rem",
                        }}
                        startIcon={
                          user?.savedPosts?.includes(post?._id) ? (
                            <BookmarkIcon />
                          ) : (
                            <BookmarkBorderIcon />
                          )
                        }
                        title={
                          user?.savedPosts?.includes(post?._id)
                            ? "Remove this post from your saved collection"
                            : "Save this post to your private collection"
                        }
                      >
                        {user?.savedPosts?.includes(post?._id)
                          ? "Remove post"
                          : "Save post"}
                      </LoadingButton>
                      <Button
                        variant="text"
                        onClick={handleReportPopUp}
                        sx={{
                          textTransform: "capitalize",
                          fontWeight: "100",
                          color: colors.error,
                        }}
                        startIcon={<FlagIcon />}
                      >
                        Report post
                      </Button>
                    </Stack>
                  )}
                </Stack>
                <Snackbar
                  open={isLinkCopied}
                  message="Link copied"
                  autoHideDuration={3000}
                />
              </Stack>
            ) : (
              <Link
                key={post?._id}
                href={`/post/${post?._id}`}
                style={{
                  padding: "0.75rem 1rem 0 0",
                  width: "100%",
                  textDecoration: "none",
                }}
              >
                <Stack spacing={2}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar
                      alt={post?.author?.name}
                      src={post?.author?.avatar ? post?.author?.avatar : ""}
                      sx={{ width: 30, height: 30 }}
                    />
                    <p
                      style={{
                        fontSize: "1rem",
                        fontWeight: "600",
                        color: "gray",
                      }}
                    >
                      {post?.author?.username}
                    </p>
                    <CircleIcon style={{ fontSize: "6px" }} />
                    <p
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: "300",
                      }}
                    >
                      {relativeTime(Date.parse(post?.createdAt))}
                    </p>
                  </Stack>
                  <h3 className={openSans.className}>{post?.post?.title}</h3>
                  {post?.post?.imageUrl && (
                    <Image
                      src={post?.post?.imageUrl}
                      alt="image alt text"
                      width={500}
                      height={260}
                      style={{ width: "100%", height: "auto" }}
                    />
                  )}
                  <div dangerouslySetInnerHTML={{ __html: post?.post?.body }} />

                  {post?.comments?.length !== 0 ? (
                    post?.comments?.length === 1 ? (
                      <p
                        style={{
                          fontSize: "0.9rem",
                          fontWeight: "300",
                          color: "gray",
                        }}
                      >
                        1 comment
                      </p>
                    ) : (
                      <p
                        style={{
                          fontSize: "0.9rem",
                          fontWeight: "300",
                          color: "gray",
                        }}
                      >
                        {post?.comments?.length} comments
                      </p>
                    )
                  ) : (
                    <p
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "300",
                        color: "gray",
                      }}
                    >
                      0 comments
                    </p>
                  )}
                </Stack>
              </Link>
            )}
          </Stack>
        </Stack>
      )}

      <ReportPostPopup
        open={openReportPopUp}
        closePopUp={handleReportPopUpClose}
        comment={comment}
        onCommentChange={handleCommentChange}
        loading={loading}
        reason={reason}
        onReasonChange={handleReasonChange}
        handleSubmitReport={handleSubmitReport}
        reportMessage={reportMessage}
      />
    </Stack>
  );
};

export default PostComponent;
