"use client";
import { useEffect, useState } from "react";
import Profile from "@/components/shop/user/profile/Profile";
import { Alert, Button, CircularProgress } from "@mui/material";
import axios from "axios";

const UserDetail = ({ params }) => {
  const { id } = params;
  const [uiState, setUiState] = useState({ loading: false });
  console.log(id);
  const [user, setUser] = useState();

  const handleOnChangeAuth = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleGetUserDetail = async () => {
    try {
      setUiState({ loading: true });
      const res = await axios.get(`http://localhost:8080/api/v1/user/${id}`);
      setUser(res?.data);

      console.log(res?.data);
      setUiState({ loading: false });
    } catch (error) {
      const message = error?.response?.data?.message;

      setUiState({
        loading: false,
        error: message,
      });
    }
  };

  const handleEditUserDetail = async () => {
    try {
      setUiState({ loading: true });
      const res = await axios.patch(
        `http://localhost:8080/api/v1/user/${id}`,
        user
      );
      setUser(res?.data);
      setUiState({ loading: false });
    } catch (error) {
      const message = error?.response?.data?.message;

      setUiState({
        loading: false,
        error: message,
      });
    }
  };

  useEffect(() => {
    handleGetUserDetail();
  }, []);

  return (
    <div className="h-full min-h-screen">
      <h1 className="font-bold text-2xl">User Profile</h1>
      <div className="bg-white rounded-lg p-3 mt-10 space-y-2">
        {uiState?.error && (
          <Alert severity="error" color="error">
            {uiState?.error}
          </Alert>
        )}
        {uiState?.loading ? (
          <CircularProgress />
        ) : (
          <Profile auth={user} handleOnChangeAuth={handleOnChangeAuth} />
        )}
        <div className="flex justify-end space-x-2">
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleGetUserDetail()}
          >
            Discard changes
          </Button>
          <Button variant="outlined" onClick={() => handleEditUserDetail()}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
