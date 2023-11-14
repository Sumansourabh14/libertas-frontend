import { Stack } from "@mui/material";
import FeatureHeading from "../FeatureHeading";
import FeatureImage from "../FeatureImage";
import SplitFeatureLayout from "../SplitFeatureLayout";

const CreatePostFeature = () => {
  return (
    <SplitFeatureLayout
      isRow={true}
      left={
        <Stack style={{ maxWidth: "400px" }} spacing={2}>
          <FeatureHeading title={`Create a post to start discussion`} />
          <p>
            Create a post by adding title, body or image to kick start the
            discussion with people
          </p>
        </Stack>
      }
      right={
        <FeatureImage
          source={`https://firebasestorage.googleapis.com/v0/b/libertas-frontend.appspot.com/o/posts%2Fcreate-post-libertas.png1e2257f8-acfa-46e8-9752-9af2432f0d8a?alt=media&token=9d62555e-73dc-46f4-bf32-2faab4166800`}
          altText="Libertas create a post"
        />
      }
    />
  );
};

export default CreatePostFeature;
