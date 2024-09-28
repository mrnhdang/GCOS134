"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
  IconButton,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const BillListPage = () => {
  const [listBills, setBills] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getlistBills();
  }, []);

  const deleteBill = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/bill/${id}`);
      setBills(listBills.filter((bill) => bill.id !== id));
      alert("Bill deleted successfully");
    } catch (error) {
      console.error("Error deleting bill:", error);
      alert("Failed to delete bill");
    }
  };

  const getlistBills = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/api/v1/bill");
      setBills(response.data);
    } catch (error) {
      console.error("Error fetching bills:", error);
    } finally {
      setLoading(false);
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
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer
            component={Paper}
            sx={{ boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)" }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#e0f7fa" }}>
                  <TableCell sx={{ fontWeight: "bold" }}>Bill ID</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>OrderID</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Total Amount
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
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
                      <TableCell>{bill?.status}</TableCell>
                      <TableCell>{bill?.orderId}</TableCell>
                      <TableCell>{bill?.totalPrice} VND</TableCell>
                      <TableCell>
                        {bill?.payDate
                          ? new Date(bill?.payDate).toLocaleDateString()
                          : "UNPAID"}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => router.push(`/admin/bill/${bill?.id}`)}
                          sx={{ color: "#1976d2" }}
                        >
                          <EditOutlinedIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => deleteBill(bill?.id)}
                          sx={{ color: "#d32f2f" }}
                        >
                          <DeleteOutlinedIcon />
                        </IconButton>
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
        )}
      </Paper>
    </Box>
  );
};

export default BillListPage;
