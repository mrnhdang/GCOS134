"use client";
import { useEffect, useState } from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import axios from "axios";

const UserPage = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/user");
      setUserList(res?.data);
    } catch (e) {
      console.error("Error fetching user data:", e);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3, backgroundColor: "#f5f5f5", borderRadius: 3 }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', textAlign: "center", mb: 2 }}>
          User Management
        </Typography>

        <TableContainer component={Paper} sx={{ boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#e0f7fa" }}>
                <TableCell sx={{ fontWeight: 'bold' }}>User ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Username</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Address</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Phone Number</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Password</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Balance</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList? (
                userList.map((user) => (
                  <TableRow key={user?._id} sx={{ '&:hover': { backgroundColor: "#f0f0f0" } }}>
                    <TableCell>{user?.id}</TableCell>
                    <TableCell>{user?.username}</TableCell>
                    <TableCell>{user?.address}</TableCell>
                    <TableCell>{user?.phoneNumber}</TableCell>
                    <TableCell>{user?.password}</TableCell>
                    <TableCell>{user?.email}</TableCell>
                    <TableCell>{user?.balance}</TableCell>
                    <TableCell>{user?.role}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Typography textAlign="center">No Users Found</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default UserPage;
