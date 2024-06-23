"use client";
import PostComponent from "@/components/postComponents/PostComponent";
import { GlobalContext } from "@/services/globalContext";
import { Container, Stack } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { Suspense, useContext, useEffect, useState } from "react";

const Search = () => {
  const [posts, setPosts] = useState([]);
  const searchParams = useSearchParams();
  const { searchPosts, upvoteAPost, downvoteAPost, loading } =
    useContext(GlobalContext);

  const query = searchParams.get("query");

  useEffect(() => {
    let mounted = true;

    async function fetchPosts() {
      const data = await searchPosts(query);

      if (mounted) {
        setPosts(data?.data?.data);
      }
    }

    fetchPosts();

    return () => {
      mounted = false;
    };
  }, [query]);

  const handleVote = async (method, postId) => {
    try {
      // Call the upvote/downvote function
      await method(postId);

      //   // Fetch the updated list of posts after upvoting/downvoting (re-render)
      //   await updatePosts();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    document.title = `Search results - ${query} | Libertas`;
  }, [query, posts]);

  if (loading) {
    <p>Loading...</p>;
  }

  return (
    <Container
      style={{
        paddingBottom: 20,
        paddingTop: 40,
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        Search results for &quot;{query}&quot;
      </h1>
      <Stack spacing={3} style={{ marginTop: 24 }}>
        {posts?.length > 0 ? (
          posts.map((post) => (
            <PostComponent
              key={post._id}
              post={post}
              id={post._id}
              handleUpvote={() => handleVote(upvoteAPost, post._id)}
              handleDownvote={() => handleVote(downvoteAPost, post._id)}
              individualView={false}
            />
          ))
        ) : (
          <p style={{ textAlign: "center" }}>No result found</p>
        )}
      </Stack>
    </Container>
  );
};

const SearchPage = () => {
  return (
    <Suspense fallback={<p>Loading search results...</p>}>
      <Search />
    </Suspense>
  );
};

export default SearchPage;
