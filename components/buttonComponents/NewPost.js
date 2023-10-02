import { useRouter } from "next/navigation";
import PrimaryButton from "./PrimaryButton";

const NewPost = () => {
  const router = useRouter();

  return (
    <PrimaryButton
      title="New Post"
      handleClick={() => router.push("/create-post")}
    />
  );
};

export default NewPost;
