"use client"; // to use useState and other hooks
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import {
  addComment,
  checkUsernameApi,
  createPost,
  deleteComment,
  deletePost,
  deleteUser,
  downvotePost,
  getAllPosts,
  getComments,
  getPost,
  getPosts,
  getUserByEmailOrUsername,
  getUserById,
  loginApi,
  logoutApi,
  passwordRecoveryEmailApi,
  randomQuoteApi,
  resetPassword,
  signUpApi,
  updatePost,
  updateUser,
  upvotePost,
  userApi,
} from "./globalApi";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children, theme }) => {
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [signUpError, setSignUpError] = useState(null);
  const [passwordRecoveryEmailError, setPasswordRecoveryEmailError] =
    useState(null);
  const [passwordResetError, setPasswordResetError] = useState(null);
  const [isPasswordRecoveryEmailSuccess, setIsPasswordRecoveryEmailSuccess] =
    useState(false);
  const [usernameMessage, setUsernameMessage] = useState("");
  const [usernameErrorCode, setUsernameErrorCode] = useState(null);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  const router = useRouter();

  const signUp = async (name, username, email, password) => {
    setSignUpError(null);

    try {
      setLoading(true);
      const data = await signUpApi(name, username, email, password);

      console.log(data);
      console.log("Signed up");

      setLoading(false);
      router.push("/login");
    } catch (error) {
      console.log(error);

      if (error.response.status === 400) {
        // setSignUpError("Another user is already registered with this email");
        setSignUpError(error.response?.data.message);
      }

      setLoading(false);
    }
  };

  const checkUsername = async (username) => {
    // setUsernameMessage("");
    // setUsernameErrorCode(null);

    try {
      // setLoading(true);
      const data = await checkUsernameApi(username);

      if (data?.data?.success) {
        setUsernameErrorCode(data?.status);
        setUsernameMessage(data?.data?.message);
      }

      return data;
    } catch (error) {
      console.log(error);
      setUsernameMessage(error?.response?.data?.message);
      setUsernameErrorCode(error?.response?.status);
      setLoading(false);
    }
  };

  const sendPasswordRecoveryEmail = async (emailOrUsername) => {
    try {
      setLoading(true);
      setIsPasswordRecoveryEmailSuccess(false);

      const data = await passwordRecoveryEmailApi(emailOrUsername);

      if (data?.data?.success) {
        setIsPasswordRecoveryEmailSuccess(true);

        const fetchUser = await getSpecificUserByEmailOrUsername(
          emailOrUsername
        );
        console.log(fetchUser);

        if (fetchUser?.data?.success) {
          router.push("/password-recovery-email-sent");
        }
      }

      console.log(data);
      setLoading(false);
      return data;
    } catch (error) {
      console.log(error);
      setPasswordRecoveryEmailError(error?.response?.data?.message);
      setLoading(false);
    }
  };

  const resetUserPassword = async (id, password, confirmPassword) => {
    try {
      setLoading(true);
      setPasswordResetError(null);

      const data = await resetPassword(id, password, confirmPassword);
      console.log(data);

      if (data?.data?.success) {
        router.push("/reset-password-success");
      }

      setLoading(false);
      return data;
    } catch (error) {
      console.log(error);
      setPasswordResetError(error?.response?.data?.message);
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoginError(null);
      setLoading(true);
      const data = await loginApi(email, password);

      setIsAuthenticated(true);
      setLoading(false);

      router.push("/feed");
    } catch (error) {
      setLoginError(error?.response?.data.message);
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const data = await logoutApi();

      console.log(data);
      console.log("Logged out");

      setIsAuthenticated(false);
      setLoading(false);
      router.push("/login");
    } catch (error) {
      console.log(error);
      setIsAuthenticated(true);
      setLoading(false);
    }
  };

  const getUser = async () => {
    try {
      const data = await userApi();
      // console.log(data.data.user);
      setUser(data.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      // console.log(error);
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const getSpecificUser = async (id) => {
    try {
      const data = await getUserById(id);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getSpecificUserByEmailOrUsername = async (emailOrUsername) => {
    try {
      const data = await getUserByEmailOrUsername(emailOrUsername);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserDetails = async (id, body) => {
    try {
      setLoading(true);
      const data = await updateUser(id, body);
      console.log(data);
      setLoading(false);
      return data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const deleteUserAccount = async (id) => {
    try {
      setLoading(true);
      const data = await deleteUser(id);
      console.log(data);
      setLoading(false);
      return data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getRandomQuote = async () => {
    try {
      const data = await randomQuoteApi();
      return data.data;
    } catch (error) {
      console.log(error);
    }
  };

  // create a post (text)
  const postPost = async (title, body, imageUrl) => {
    try {
      setLoading(true);
      const data = await createPost(title, body, imageUrl);
      setLoading(false);
      return data;
    } catch (error) {
      // console.log(error);
      setLoading(false);
    }
  };

  // upvote a post
  const upvoteAPost = async (id) => {
    try {
      if (!user) {
        router.push("/login");
      }
      const data = await upvotePost(id);
      console.log("upvote: ", data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  // downvote a post
  const downvoteAPost = async (id) => {
    try {
      if (!user) {
        router.push("/login");
      }
      const data = await downvotePost(id);
      console.log("downvote: ", data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  // edit a post (text)
  const editPost = async (id, title, body) => {
    try {
      const data = await updatePost(id, title, body);
      // console.log(data);
      return data;
    } catch (error) {
      // console.log(error);
    }
  };

  const createComment = async (id, body) => {
    try {
      const data = await addComment(id, body);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getCommentsByPostId = async (id) => {
    try {
      const data = await getComments(id);
      // console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const removeComment = async (id, commentId) => {
    try {
      const data = await deleteComment(id, commentId);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  // fetch posts of a certain user
  const fetchPosts = async (userId) => {
    try {
      const data = await getPosts(userId);
      console.log(data.data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  // fetch a certain post
  const fetchPost = async (postId) => {
    try {
      const data = await getPost(postId);
      // console.log(data.data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  // fetch all posts (regardless of the user)
  const fetchAllPosts = async () => {
    try {
      const data = await getAllPosts();
      // console.log(data);
      setPosts(data?.data?.data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const removePost = async (postId) => {
    try {
      const data = await deletePost(postId);
      console.log(data.data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [isAuthenticated]);

  useEffect(() => {
    setPasswordRecoveryEmailError(null);
    setPasswordResetError(null);
  }, []);

  // useEffect(() => {
  //   console.log({ user });
  // }, [user]);

  // useEffect(() => {
  //   fetchAllPosts();
  // }, []);

  return (
    <GlobalContext.Provider
      value={{
        loading,
        login,
        isAuthenticated,
        loginError,
        logout,
        signUp,
        signUpError,
        checkUsername,
        sendPasswordRecoveryEmail,
        passwordRecoveryEmailError,
        isPasswordRecoveryEmailSuccess,
        resetUserPassword,
        passwordResetError,
        usernameMessage,
        usernameErrorCode,
        user,
        getSpecificUser,
        updateUserDetails,
        deleteUserAccount,
        getRandomQuote,
        theme,
        postPost,
        editPost,
        getCommentsByPostId,
        createComment,
        removeComment,
        fetchPosts,
        fetchPost,
        removePost,
        posts,
        fetchAllPosts,
        upvoteAPost,
        downvoteAPost,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
