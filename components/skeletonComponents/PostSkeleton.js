import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const PostSkeleton = () => {
  return (
    <Box
      sx={{
        p: 2,
        border: "1px solid #333",
        borderRadius: 2,
        backgroundColor: "#000",
        color: "#fff",
      }}
    >
      <Stack direction="row" gap={4} alignItems="flex-start">
        <Stack alignItems="center" spacing={1}>
          <ThumbUpIcon sx={{ color: "#888" }} />
          <Skeleton width={20} height={20} animation="wave" />
          <ThumbDownIcon sx={{ color: "#888" }} />
          <Skeleton width={20} height={20} animation="wave" />
        </Stack>
        <Stack sx={{ width: "100%" }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar sx={{ bgcolor: "#555" }}>
              <Skeleton
                variant="circular"
                width={40}
                height={40}
                animation="wave"
              />
            </Avatar>
            <Stack>
              <Skeleton width={100} height={20} animation="wave" />
              <Skeleton width={80} height={15} animation="wave" />
            </Stack>
          </Stack>
          <Box mt={2}>
            <Skeleton width="100%" height={45} animation="wave" />
            <Skeleton width="90%" height={30} animation="wave" />
            <Skeleton width="40%" height={30} animation="wave" />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default PostSkeleton;
