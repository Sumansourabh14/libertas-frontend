import { GlobalContext } from "@/services/globalContext";
import { useContext, useEffect, useState } from "react";

const useFetchPosts = () => {
  const [posts, setPosts] = useState([]);

  const { fetchAllPosts } = useContext(GlobalContext);

  useEffect(() => {
    let mounted = true;

    async function fetchPosts() {
      const data = await fetchAllPosts();

      if (mounted) {
        setPosts(data?.data?.data);
      }
    }

    fetchPosts();

    return () => {
      mounted = false;
    };
  }, []);

  const updatePosts = async () => {
    const data = await fetchAllPosts();
    setPosts(data?.data?.data);
  };

  return [posts, updatePosts];
};

export default useFetchPosts;
