"use client";
import TextInput from "@/components/formComponents/TextInput";
import ConfirmedModal from "@/components/modalComponents/ConfirmedModal";
import { GlobalContext } from "@/services/globalContext";
import { colors } from "@/theme/colors";
import { storage } from "@/utils/firebase";
import EditIcon from "@mui/icons-material/Edit";
import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Button,
  IconButton,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { v4 } from "uuid";

const fileTypes = ["JPG", "PNG"];

const ProfileUpdate = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [twitter, setTwitter] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loadingAvatar, setLoadingAvatar] = useState(false);

  const [profileImage, setProfileImage] = useState(null);

  const [isChangesSaved, setIsChangesSaved] = useState(false);

  const { user, updateUserDetails, loading } = useContext(GlobalContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
    if (user) {
      console.log(user);
    }
  }, []);

  useEffect(() => {
    if (user) {
      setName(user?.name);
      setUsername(user?.username);
      setEmail(user?.email);
      setBio(user?.bio);
      setWebsite(user?.website);
      setTwitter(user?.twitter);
      setAvatar(user?.avatar);
    }
  }, [user]);

  const uploadAvatar = async () => {
    if (profileImage) {
      setLoadingAvatar(true);
      const imageRef = ref(storage, `avatars/${profileImage.name + v4()}`);

      const response = await uploadBytes(imageRef, profileImage);

      if (response) {
        const url = await getDownloadURL(response.ref);
        console.log({ url });
        setAvatarUrl(url);
      }
      setLoadingAvatar(false);
    }
  };

  const handleChange = (image) => {
    setProfileImage(image);

    // if (!!profileImage) {
    uploadAvatar();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("bio", bio);
    formData.append("website", website);
    formData.append("twitter", twitter);
    formData.append("avatar", avatarUrl);

    console.log(...formData);

    const data = await updateUserDetails(user?._id, formData);

    if (data?.data?.success) {
      setIsChangesSaved(true);
    }
  };

  useEffect(() => {
    document.title = "Profile Settings | Libertas";
  }, []);

  return (
    <Stack spacing={3}>
      <h1>Update Profile</h1>
      <form onSubmit={handleUpdate}>
        <Stack spacing={3}>
          <FileUploader
            handleChange={handleChange}
            name="file"
            types={fileTypes}
          >
            <Avatar
              alt={name ? name : ""}
              sx={{ width: 120, height: 120 }}
              src={
                loadingAvatar
                  ? ""
                  : !!profileImage
                  ? URL.createObjectURL(profileImage)
                  : !!avatar
                  ? avatar
                  : ""
              }
            />
            <IconButton
              aria-label="edit user avatar"
              style={{
                position: "absolute",
                bottom: 0,
                left: 80,
                background: "#000",
                color: "#FFF",
              }}
            >
              <EditIcon />
            </IconButton>
          </FileUploader>
          <TextInput
            type="text"
            // nameOfInput="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextInput
            type="text"
            nameOfInput="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextInput
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            size="small"
            type="text"
            label="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            fullWidth
            multiline
            rows={3}
          />
          <TextInput
            type="text"
            placeholder="Website URL"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
          <TextInput
            type="text"
            placeholder="Twitter"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
          />
          <div>
            <LoadingButton
              loading={loading}
              variant="contained"
              type="submit"
              sx={{
                textTransform: "capitalize",
                backgroundColor: "#FFFFFF",
                fontWeight: "600",
                borderRadius: "0rem",
              }}
            >
              Save Changes
            </LoadingButton>
          </div>
        </Stack>
      </form>

      <ConfirmedModal
        title="Changes saved"
        body="Your profile changes have been updated successfully."
        isOpen={isChangesSaved}
        handleClose={() => setIsChangesSaved(false)}
        handleConfirmation={() => router.push("/profile")}
      />
    </Stack>
  );
};

export default ProfileUpdate;
