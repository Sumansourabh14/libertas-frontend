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
  reportPostApi,
  resetPassword,
  searchAllPosts,
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

      setLoading(false);
      router.push("/login");
    } catch (error) {
      if (error.response.status === 400) {
        setSignUpError(error.response?.data.message);
      }

      setLoading(false);
    }
  };

  const checkUsername = async (username) => {
    try {
      const data = await checkUsernameApi(username);

      if (data?.data?.success) {
        setUsernameErrorCode(data?.status);
        setUsernameMessage(data?.data?.message);
      }

      return data;
    } catch (error) {
      setUsernameMessage(error?.response?.data?.message);
      setUsernameErrorCode(error?.response?.status);
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

        if (fetchUser?.data?.success) {
          router.push("/password-recovery-email-sent");
        }
      }

      setLoading(false);
      return data;
    } catch (error) {
      setPasswordRecoveryEmailError(error?.response?.data?.message);
      setLoading(false);
    }
  };

  const resetUserPassword = async (id, password, confirmPassword) => {
    try {
      setLoading(true);
      setPasswordResetError(null);

      const data = await resetPassword(id, password, confirmPassword);

      if (data?.data?.success) {
        router.push("/reset-password-success");
      }

      setLoading(false);
      return data;
    } catch (error) {
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

      setIsAuthenticated(false);
      setLoading(false);

      router.push("/login");
    } catch (error) {
      setIsAuthenticated(true);
      setLoading(false);
    }
  };

  const getUser = async () => {
    try {
      const data = await userApi();
      setUser(data.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const getSpecificUser = async (id) => {
    try {
      const data = await getUserById(id);
      return data;
    } catch (error) {
      // console.log(error);
    }
  };

  const getSpecificUserByEmailOrUsername = async (emailOrUsername) => {
    try {
      const data = await getUserByEmailOrUsername(emailOrUsername);
      return data;
    } catch (error) {
      // console.log(error);
    }
  };

  const updateUserDetails = async (id, body) => {
    try {
      setLoading(true);
      const data = await updateUser(id, body);
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
    }
  };

  const deleteUserAccount = async (id) => {
    try {
      setLoading(true);
      const data = await deleteUser(id);
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
    }
  };

  const getRandomQuote = async () => {
    try {
      const data = await randomQuoteApi();
      return data.data;
    } catch (error) {
      // console.log(error);
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
      return data;
    } catch (error) {
      // console.log(error);
    }
  };

  // downvote a post
  const downvoteAPost = async (id) => {
    try {
      if (!user) {
        router.push("/login");
      }
      const data = await downvotePost(id);
      return data;
    } catch (error) {
      // console.log(error);
    }
  };

  // edit a post (text)
  const editPost = async (id, title, body) => {
    try {
      const data = await updatePost(id, title, body);
      return data;
    } catch (error) {
      // console.log(error);
    }
  };

  const createComment = async (id, body) => {
    try {
      const data = await addComment(id, body);
      return data;
    } catch (error) {
      // console.log(error);
    }
  };

  const getCommentsByPostId = async (id) => {
    try {
      const data = await getComments(id);
      return data;
    } catch (error) {
      // console.log(error);
    }
  };

  const removeComment = async (id, commentId) => {
    try {
      const data = await deleteComment(id, commentId);
      return data;
    } catch (error) {
      // console.log(error);
    }
  };

  // fetch posts of a certain user
  const fetchPosts = async (userId) => {
    try {
      const data = await getPosts(userId);
      return data;
    } catch (error) {
      // console.log(error);
    }
  };

  // fetch a certain post
  const fetchPost = async (postId) => {
    try {
      const data = await getPost(postId);
      return data;
    } catch (error) {
      // console.log(error);
    }
  };

  // fetch all posts (regardless of the user)
  const fetchAllPosts = async () => {
    try {
      const data = await getAllPosts();
      setPosts(data?.data?.data);
      return data;
    } catch (error) {
      // console.log(error);
    }
  };

  // search all posts (regardless of the user)
  const searchPosts = async (query) => {
    try {
      setLoading(true);
      const data = await searchAllPosts(query);
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
    }
  };

  const removePost = async (postId) => {
    try {
      const data = await deletePost(postId);
      return data;
    } catch (error) {
      // console.log(error);
    }
  };

  // report a post
  const reportPost = async (postId, reporterId, reason, comment) => {
    try {
      setLoading(true);
      const data = await reportPostApi(postId, reporterId, reason, comment);
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, [isAuthenticated]);

  useEffect(() => {
    setPasswordRecoveryEmailError(null);
    setPasswordResetError(null);
  }, []);

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
        searchPosts,
        reportPost,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
