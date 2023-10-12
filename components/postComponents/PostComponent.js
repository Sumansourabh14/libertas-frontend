import { GlobalContext } from "@/services/globalContext";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import CircleIcon from "@mui/icons-material/Circle";
import {
  Button,
  IconButton,
  Stack,
  TextField,
  TextareaAutosize,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import Link from "next/link";
import { useContext } from "react";
import { relativeTime } from "../utils/relativeTime";
import Image from "next/image";
import OptionButton from "../buttonComponents/OptionButton";
import TextEditor from "../textEditor/TextEditor";

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
}) => {
  const { user } = useContext(GlobalContext);
  const mobileScreenSize = useMediaQuery("(max-width:600px)");

  return (
    <Stack key={id}>
      <Stack
        spacing={2}
        style={{
          backgroundColor: "#F0F0F0",
          padding: 12,
          borderRadius: "0.5rem",
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
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
              <Stack direction="row" justifyContent="space-between" spacing={2}>
                <p style={{ fontSize: "1rem", fontWeight: "600" }}>
                  {post?.author?.username}
                </p>
                <p
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: "300",
                    color: "grey",
                  }}
                >
                  {relativeTime(Date.parse(post?.createdAt))}
                </p>
              </Stack>

              <>
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
                      onChange={handleTitle}
                    />
                    {/* <TextareaAutosize
                      aria-label="textarea for text body"
                      placeholder="Enter text"
                      minRows={10}
                      value={body}
                      onChange={handleBody}
                      style={{
                        width: "100%",
                        fontFamily: "inherit",
                        fontSize: "1rem",
                        padding: 10,
                      }}
                    /> */}
                    <TextEditor value={body} setValue={handleBody} />
                  </Stack>
                ) : (
                  <>
                    <h2
                      style={{
                        fontSize: mobileScreenSize ? "1.2rem" : "1.7rem",
                      }}
                    >
                      {post?.post?.title}
                    </h2>
                    {post?.post?.imageUrl && (
                      <Image
                        src={post?.post?.imageUrl}
                        alt=""
                        width={640}
                        height={335}
                        style={{ maxWidth: "100%", height: "auto" }}
                      />
                    )}
                    {/* <p style={{ fontSize: individualView ? "1rem" : "0.9rem" }}>
                      {post?.post?.body}
                    </p> */}
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
            </Stack>
          ) : (
            <Link
              key={post?._id}
              href={`/post/${post?._id}`}
              style={{
                width: "100%",
              }}
            >
              <Stack spacing={2}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <p
                    style={{
                      fontSize: "1rem",
                      fontWeight: "600",
                      color: "gray",
                    }}
                  >
                    {post?.author?.username}
                  </p>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: "300",
                      color: "#000",
                      padding: 4,
                      borderRadius: "0.2rem",
                      backgroundColor: "#C3C5BF",
                    }}
                  >
                    {relativeTime(Date.parse(post?.createdAt))}
                  </p>
                </Stack>
                <h3>{post?.post?.title}</h3>
                {post?.post?.imageUrl && (
                  <Image
                    src={post?.post?.imageUrl}
                    alt=""
                    width={500}
                    height={260}
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                )}
                {/* <p
                  style={{
                    fontSize: "0.9rem",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "8", // how many lines we want to show
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {post?.post?.body}
                </p> */}
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
    </Stack>
  );
};

export default PostComponent;
