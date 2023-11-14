import { Stack } from "@mui/material";
import FeatureHeading from "../FeatureHeading";
import FeatureImage from "../FeatureImage";
import SplitFeatureLayout from "../SplitFeatureLayout";

const CommentFeature = () => {
  return (
    <SplitFeatureLayout
      left={
        <Stack style={{ maxWidth: "400px" }} spacing={2}>
          <FeatureHeading title={`Add comments to interact`} />
          <p>
            Open a post and simply type in your thoughts to add a comment.
            Delete it whenever your wish to
          </p>
        </Stack>
      }
      right={
        <FeatureImage
          source={`https://firebasestorage.googleapis.com/v0/b/libertas-frontend.appspot.com/o/posts%2Fcomment.pngb90167ee-f8c1-4d01-b221-6f10f593688d?alt=media&token=b6f6107f-7448-4f88-a30e-35b86118003d`}
          altText="Libertas comment"
        />
      }
    />
  );
};

export default CommentFeature;
