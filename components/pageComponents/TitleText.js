import { openSans } from "@/theme/fonts";
import { Stack } from "@mui/material";

const TitleText = ({ title, text }) => {
  return (
    <Stack
      alignItems="center"
      spacing={2}
      style={{ marginBottom: "2rem", textAlign: "center" }}
    >
      <h1 className={openSans.className} style={{ fontSize: "2.5rem" }}>
        {title}
      </h1>
      {!!text && <p>{text}</p>}
    </Stack>
  );
};

export default TitleText;
