import { Stack, useMediaQuery } from "@mui/material";

const SplitFeatureLayout = ({ left, right, isRow }) => {
  const mobileScreenSize = useMediaQuery("(max-width:600px)");

  return (
    <Stack
      direction={mobileScreenSize ? "column" : isRow ? "row" : "row-reverse"}
      alignItems="center"
      spacing={6}
      style={{
        padding: mobileScreenSize ? "90px 30px" : "120px 60px",
      }}
    >
      {left}
      <Stack>{right}</Stack>
    </Stack>
  );
};

export default SplitFeatureLayout;
