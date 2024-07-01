import { Box, Skeleton } from "@mui/material";

const RecentPostsSkeleton = () => {
  return (
    <Box sx={{ padding: 10, backgroundColor: "#333", borderRadius: 1, mb: 2 }}>
      <Box display="flex" alignItems="center" mb={1}>
        <Box ml={2}>
          <Skeleton width="60%" />
          <Skeleton width="40%" />
        </Box>
      </Box>
      <Skeleton width="100%" height={24} />
      <Skeleton width="80%" height={24} />
      <Skeleton width="90%" height={24} />
    </Box>
  );
};

export default RecentPostsSkeleton;
