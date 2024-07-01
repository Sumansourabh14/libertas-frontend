import PostSkeleton from "./PostSkeleton";

const PostSkeletonsGroup = () => {
  return [1, 2, 3].map((skeleton, index) => <PostSkeleton key={index} />);
};

export default PostSkeletonsGroup;
