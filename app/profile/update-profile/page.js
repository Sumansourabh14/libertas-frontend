"use client";
import TextInput from "@/components/formComponents/TextInput";
import ConfirmedModal from "@/components/modalComponents/ConfirmedModal";
import LoadingButton from "@/components/pageComponents/LoadingButton";
import { GlobalContext } from "@/services/globalContext";
import { colors } from "@/theme/colors";
import { Button, Snackbar, Stack, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const ProfileUpdate = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [twitter, setTwitter] = useState("");
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
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("bio", bio);
    formData.append("website", website);
    formData.append("twitter", twitter);

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
          <Button
            variant="contained"
            type="submit"
            style={{
              textTransform: "capitalize",
              backgroundColor: colors.button.background,
              fontWeight: "600",
              width: "200px",
            }}
          >
            Save Changes
            {loading && (
              <div style={{ marginLeft: "0.6rem" }}>
                <LoadingButton />
              </div>
            )}
          </Button>
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
