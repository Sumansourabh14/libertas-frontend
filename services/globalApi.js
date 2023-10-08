import axios from "axios";
import { API_URL, QUOTES_API_URL } from "../utils/config";

// Consider
// https://api.hamatim.com/quote (For book quotes)

export const signUpApi = async (name, username, email, password) => {
  const data = await axios.post(`${API_URL}/api/user/sign-up`, {
    name,
    username,
    email,
    password,
  });

  return data;
};

export const loginApi = async (email, password) => {
  const data = await axios.post(
    `${API_URL}/api/auth/login`,
    {
      email,
      password,
    },
    { withCredentials: true }
  );

  return data;
};

export const logoutApi = async () => {
  const data = await axios.get(`${API_URL}/api/auth/logout`, {
    withCredentials: true,
  });

  return data;
};

export const userApi = async () => {
  const data = await axios.get(`${API_URL}/api/user/user`, {
    withCredentials: true,
  });
  // console.log(data);

  return data;
};

export const getUserById = async (id) => {
  const data = await axios.get(`${API_URL}/api/user/${id}`, {
    withCredentials: true,
  });

  return data;
};

export const updateUser = async (id, formData) => {
  const data = await axios.put(`${API_URL}/api/user/user/${id}`, formData, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const deleteUser = async (id) => {
  const data = await axios.delete(`${API_URL}/api/user/user/${id}`, {
    withCredentials: true,
  });

  return data;
};

export const createPost = async (title, body, imageUrl) => {
  const data = await axios.post(
    `${API_URL}/api/user/create-post`,
    { title, body, imageUrl },
    {
      withCredentials: true,
    }
  );

  return data;
};

export const upvotePost = async (id) => {
  const data = await axios.post(
    `${API_URL}/api/user/post/upvote/${id}`,
    {},
    {
      withCredentials: true,
    }
  );

  return data;
};

export const downvotePost = async (id) => {
  const data = await axios.post(
    `${API_URL}/api/user/post/downvote/${id}`,
    {},
    {
      withCredentials: true,
    }
  );

  return data;
};

export const updatePost = async (id, title, body) => {
  const data = await axios.put(
    `${API_URL}/api/user/edit-post/${id}`,
    { title, body },
    {
      withCredentials: true,
    }
  );

  return data;
};

export const addComment = async (id, body) => {
  const data = await axios.post(
    `${API_URL}/api/user/post/comment/${id}`,
    { body },
    {
      withCredentials: true,
    }
  );

  return data;
};

export const getComments = async (id) => {
  const data = await axios.get(`${API_URL}/api/user/post/comments/${id}`, {
    withCredentials: true,
  });

  return data;
};

export const deleteComment = async (id, commentId) => {
  const data = await axios.put(
    `${API_URL}/api/user/post/comment/${id}`,
    { commentId },
    {
      withCredentials: true,
    }
  );

  return data;
};

export const getPosts = async (userId) => {
  const data = await axios.get(`${API_URL}/api/user/posts/${userId}`, {
    withCredentials: true,
  });

  return data;
};

export const getPost = async (postId) => {
  const data = await axios.get(`${API_URL}/api/user/post/${postId}`, {
    withCredentials: true,
  });

  return data;
};

export const getAllPosts = async () => {
  const data = await axios.get(`${API_URL}/api/user/submitted/posts`, {
    withCredentials: true,
  });

  // console.log(data);

  return data;
};

export const deletePost = async (postId) => {
  const data = await axios.delete(`${API_URL}/api/user/post/${postId}`, {
    withCredentials: true,
  });

  return data;
};

export const randomQuoteApi = async () => {
  const data = await axios.get(`${QUOTES_API_URL}/random/quote`);

  return data;
};
