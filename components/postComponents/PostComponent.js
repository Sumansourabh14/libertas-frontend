import { GlobalContext } from "@/services/globalContext";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  IconButton,
  Stack,
  TextField,
  TextareaAutosize,
  Tooltip,
} from "@mui/material";
import Link from "next/link";
import { useContext } from "react";
import { relativeTime } from "../utils/relativeTime";

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

  return (
    <Stack key={id}>
      <Stack
        spacing={2}
        style={{
          backgroundColor: "#f3f3f3",
          padding: 12,
          borderRadius: "0.5rem",
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
                    <TextareaAutosize
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
                    />
                  </Stack>
                ) : (
                  <>
                    <h2 style={{ fontSize: "1.7rem" }}>{post?.post?.title}</h2>
                    <p style={{ fontSize: individualView ? "1rem" : "0.9rem" }}>
                      {post?.post?.body}
                    </p>
                  </>
                )}
                <Stack>
                  {!isEdit ? (
                    user?._id === post?.author?._id && (
                      <Stack
                        direction="row"
                        spacing={2}
                        style={{
                          backgroundColor: "#fff",
                          width: "100px",
                          borderRadius: "0.5rem",
                          padding: 2,
                        }}
                      >
                        <Tooltip title="Edit" arrow>
                          <IconButton onClick={handleEdit} aria-label="edit">
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete" arrow>
                          <IconButton
                            onClick={handleDelete}
                            aria-label="delete"
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    )
                  ) : (
                    <Stack direction="row" spacing={2}>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                      <Button variant="contained" onClick={handleSave}>
                        Save
                      </Button>
                    </Stack>
                  )}
                </Stack>
              </>
            </Stack>
          ) : (
            <Link key={post?._id} href={`/post/${post?._id}`}>
              <Stack spacing={2}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  spacing={2}
                >
                  <p style={{ fontSize: "1rem", fontWeight: "600" }}>
                    {post?.author?.username}
                  </p>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: "300",
                    }}
                  >
                    {relativeTime(Date.parse(post?.createdAt))}
                  </p>
                </Stack>
                <h3>{post?.post?.title}</h3>
                <p style={{ fontSize: "0.9rem" }}>{post?.post?.body}</p>
              </Stack>
            </Link>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PostComponent;
