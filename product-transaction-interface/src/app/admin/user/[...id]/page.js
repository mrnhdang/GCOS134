"use client";
import { useContext } from "react";
import { AuthStateContext } from "@/provider/AuthContext";
import Profile from "@/components/shop/user/profile/Profile";

const UserDetail = () => {
  const {
    auth,
    handleOnChangeAuth,
    handleEditUserDetail,
    handleGetUserDetail,
    uiState,
  } = useContext(AuthStateContext);

  return (
    <div className="h-full min-h-screen">
      <Profile auth={auth} handleOnChangeAuth={handleOnChangeAuth} />
    </div>
  );
};

export default UserDetail;
