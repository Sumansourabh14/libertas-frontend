import { useRouter } from "next/navigation";
import PrimaryButton from "./PrimaryButton";

const NewPost = () => {
  const router = useRouter();

  return (
    <PrimaryButton
      title="New Post"
      handleClick={() => router.push("/create-post")}
      color="#000"
      bgColor="#FFF"
    />
  );
};

export default NewPost;
