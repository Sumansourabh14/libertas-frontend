"use client";
import DeletePostModal from "@/components/modalComponents/DeletePostModal";
import LoadingButton from "@/components/pageComponents/LoadingButton";
import { GlobalContext } from "@/services/globalContext";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Container, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

const AccountSettings = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { loading, user, deleteUserAccount } = useContext(GlobalContext);
  const router = useRouter();

  const handleDeleteUser = async () => {
    const data = await deleteUserAccount(user?._id);

    if (data) {
      router.push("/sign-up");
    }
  };

  return (
    <Container>
      <h1>Account Settings</h1>
      <Stack style={{ paddingTop: 20 }}>
        <Button
          variant="contained"
          onClick={() => setIsDeleteModalOpen(true)}
          style={{
            textTransform: "capitalize",
            backgroundColor: "#FF6969",
            fontWeight: "600",
            width: "200px",
            color: "#000",
          }}
          startIcon={<DeleteIcon />}
        >
          Delete Account
          {loading && (
            <div style={{ marginLeft: "0.6rem" }}>
              <LoadingButton />
            </div>
          )}
        </Button>
      </Stack>

      <DeletePostModal
        title="We are sad to see you go!"
        body="Are you sure you want to delete your account? You can't undo this"
        isPostRemove={isDeleteModalOpen}
        handleDeleteModalClose={() => setIsDeleteModalOpen(false)}
        handleDeletePost={handleDeleteUser}
      />
    </Container>
  );
};

export default AccountSettings;
