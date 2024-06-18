import { openSans } from "@/theme/fonts";
import { useMediaQuery } from "@mui/material";

const NormalTitle = ({ title }) => {
  const mobileScreenSize = useMediaQuery("(max-width:600px)");

  return (
    <h1
      className={openSans.className}
      style={{
        fontSize: mobileScreenSize ? "3rem" : "4rem",
        fontWeight: "800",
        color: "#FFF",
      }}
    >
      {title}
    </h1>
  );
};

export default NormalTitle;
