import { Stack } from "@mui/material";

const TitleText = ({ title, text }) => {
  return (
    <Stack
      alignItems="center"
      spacing={2}
      style={{ marginBottom: "2rem", textAlign: "center" }}
    >
      <h1>{title}</h1>
      {!!text && <p>{text}</p>}
    </Stack>
  );
};

export default TitleText;
