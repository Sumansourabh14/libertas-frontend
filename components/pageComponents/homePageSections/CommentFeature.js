import { Stack, useMediaQuery } from "@mui/material";
import Heading from "../Heading";
import Image from "next/image";
import FeatureHeading from "../FeatureHeading";

const CommentFeature = () => {
  const mobileScreenSize = useMediaQuery("(max-width:600px)");

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={6}
      style={{
        padding: mobileScreenSize ? "90px 30px" : "120px 60px",
      }}
    >
      <Stack style={{ maxWidth: "400px" }} spacing={2}>
        <FeatureHeading title={`Add comments to interact`} />
        <p>
          Open a post and simply type in your thoughts to add a comment. Delete
          it whenever your wish to
        </p>
      </Stack>
      <Stack>
        <Image
          src={`https://firebasestorage.googleapis.com/v0/b/libertas-frontend.appspot.com/o/posts%2Fcomment.pngb90167ee-f8c1-4d01-b221-6f10f593688d?alt=media&token=b6f6107f-7448-4f88-a30e-35b86118003d`}
          alt="Libertas comment"
          width={800}
          height={300}
          style={{
            maxWidth: "100%",
            height: "auto",
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          }}
        />
      </Stack>
    </Stack>
  );
};

export default CommentFeature;
