import { openSans } from "@/theme/fonts";
import { useMediaQuery } from "@mui/material";

const Heading = ({ title }) => {
  const mobileScreenSize = useMediaQuery("(max-width:600px)");

  return (
    <h2
      className={openSans.className}
      style={{
        fontSize: mobileScreenSize ? "2rem" : "3rem",
        fontWeight: "800",
        color: "#FFF",
      }}
    >
      {title}
    </h2>
  );
};

export default Heading;
