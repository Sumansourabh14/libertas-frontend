"use client";
import FeedPresentation from "@/components/postComponents/FeedPresentation";
import useFetchPosts from "@/utils/customHooks/useFetchPosts";
import { useEffect } from "react";

const Feed = () => {
  // fetching all the posts from the custom hook
  const [posts, updatePosts] = useFetchPosts();

  const handleVote = async (method, postId) => {
    try {
      // Call the upvote/downvote function
      await method(postId);

      // Fetch the updated list of posts after upvoting/downvoting (re-render)
      await updatePosts();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    document.title = "What's Happening | Libertas";
  }, []);

  // useEffect(() => {
  //   console.log(posts);
  // }, [posts]);

  return <FeedPresentation posts={posts} handleVote={handleVote} />;
};

export default Feed;
