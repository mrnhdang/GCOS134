"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";

const BillListPage = () => {
  const [listBills, setBills] = useState([]);

  useEffect(() => {
    getlistBills();
  }, []);

  const getlistBills = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/bill");
      setBills(response.data);
    } catch (error) {
      console.error("Error fetching bills:", error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper
        elevation={3}
        sx={{ p: 3, mb: 3, backgroundColor: "#f5f5f5", borderRadius: 3 }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}
        >
          Bill Management
        </Typography>

        <TableContainer
          component={Paper}
          sx={{ boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)" }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#e0f7fa" }}>
                <TableCell sx={{ fontWeight: "bold" }}>Bill ID</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Customer Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>OrderID</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Total Amount</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listBills ? (
                listBills?.map((bill) => (
                  <TableRow
                    key={bill?.id}
                    sx={{ "&:hover": { backgroundColor: "#f0f0f0" } }}
                  >
                    <TableCell>{bill?.id}</TableCell>
                    <TableCell>{bill?.user?.username}</TableCell>
                    <TableCell>{bill?.status}</TableCell>
                    <TableCell>{bill?.orderId}</TableCell>
                    <TableCell>{bill?.totalPrice} VND</TableCell>
                    <TableCell>
                      {bill?.payDate
                        ? new Date(bill?.payDate).toLocaleDateString()
                        : "UNPAID"}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Typography textAlign="center">No Bills</Typography>
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

export default BillListPage;
