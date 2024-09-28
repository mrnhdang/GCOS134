"use client";
import { useRouter } from "next/navigation";
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
  Button,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const BillDetailPage = ({ params }) => {
  const [bill, setBill] = useState(null);
  const router = useRouter();
  const { id } = params;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBillDetail();
  }, []);

  const getBillDetail = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/api/v1/bill/${id}`
      );
      setBill(response?.data);
    } catch (error) {
      console.error("Error fetching bill detail:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper
        elevation={3}
        sx={{ p: 3, backgroundColor: "#f5f5f5", borderRadius: 3 }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}
        >
          Bill Details - {bill?.id}
        </Typography>

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : bill ? (
          <Box>
            <Typography variant="h6">Customer: {bill?.username}</Typography>
            <Typography variant="h6">Status: {bill?.status}</Typography>
            <Typography variant="h6">
              Total Price: {bill?.totalPrice} VND
            </Typography>
            <Typography variant="h6">
              Pay Date:{" "}
              {bill?.payDate
                ? new Date(bill?.payDate).toLocaleDateString()
                : "UNPAID"}
            </Typography>
            <TableContainer component={Paper} sx={{ mt: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bill?.products?.map((product) => (
                    <TableRow key={product?.id}>
                      <TableCell>{product?.productName}</TableCell>
                      <TableCell>{product?.price} VND</TableCell>
                      <TableCell>{product?.orderAmount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ) : (
          <Typography>No bill found</Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => router.push("/admin/bill")}
        >
          Back to Bills
        </Button>
      </Paper>
    </Box>
  );
};

export default BillDetailPage;
