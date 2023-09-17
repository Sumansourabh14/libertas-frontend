"use client";
import { GlobalContext } from "@/services/globalContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const Profile = () => {
  const { user } = useContext(GlobalContext);
  const router = useRouter();

  console.log(user);

  if (!user) {
    router.push("/login");
  }

  return (
    <div>
      <h1>Hi, {user?.name}!</h1>
    </div>
  );
};

export default Profile;
