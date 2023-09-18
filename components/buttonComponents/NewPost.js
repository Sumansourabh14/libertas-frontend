import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const NewPost = () => {
  const router = useRouter();

  return (
    <Button variant="contained" onClick={() => router.push("/create-post")}>
      New Post
    </Button>
  );
};

export default NewPost;
