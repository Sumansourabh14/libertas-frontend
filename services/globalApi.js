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
  console.log(data);

  return data;
};

export const createPost = async (title, body) => {
  const data = await axios.post(
    `${API_URL}/api/user/create-post`,
    { title, body },
    {
      withCredentials: true,
    }
  );
  console.log(data);

  return data;
};

export const randomQuoteApi = async () => {
  const data = await axios.get(`${QUOTES_API_URL}/random/quote`);

  return data;
};

// // Fetch a random quote from an author
// export const getQuote = async () => {
//   const data = await axios.get(`https://api.quotable.io/random`);

//   return data;
// };
