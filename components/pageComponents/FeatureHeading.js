import { openSans } from "@/theme/fonts";
import { useMediaQuery } from "@mui/material";

const FeatureHeading = ({ title }) => {
  const mobileScreenSize = useMediaQuery("(max-width:600px)");

  return (
    <h2
      className={openSans.className}
      style={{
        fontSize: mobileScreenSize ? "1.2rem" : "2.4rem",
        fontWeight: "800",
        lineHeight: 1.2,
      }}
    >
      {title}
    </h2>
  );
};

export default FeatureHeading;
