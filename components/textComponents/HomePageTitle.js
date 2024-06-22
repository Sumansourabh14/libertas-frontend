import { openSans } from "@/theme/fonts";
import { useMediaQuery } from "@mui/material";

const HomePageTitle = ({ title }) => {
  const mobileScreenSize = useMediaQuery("(max-width:600px)");
  const tabletScreenSize = useMediaQuery(
    "(min-width:600px) and (max-width:1200px)"
  );
  const laptopScreenSize = useMediaQuery(
    "(min-width:1200px) and (max-width:1536px)"
  );

  return (
    <h1
      className={openSans.className}
      style={{
        color: "#FFF",
        fontSize: mobileScreenSize
          ? "3rem"
          : tabletScreenSize
          ? "4rem"
          : laptopScreenSize
          ? "5rem"
          : "6.5rem",
        fontWeight: "900",
      }}
    >
      {title}
    </h1>
  );
};

export default HomePageTitle;
