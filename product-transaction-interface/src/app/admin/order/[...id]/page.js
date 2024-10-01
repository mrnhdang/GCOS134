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
import CustomStatus from "@/generic/CustomStatus";

const OrderDetailPage = ({ params }) => {
  const [order, setOrder] = useState(null);
  const router = useRouter();
  const { id } = params;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrderDetail();
  }, []);

  const getOrderDetail = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/api/v1/order/${id}`
      );
      setOrder(response?.data);
    } catch (error) {
      console.error("Error fetching order detail:", error);
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
          Order Details - {order?.id}
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
        ) : order ? (
          <Box>
            <Typography variant="h6">
              Customer: {order?.user?.username}
            </Typography>
            <Typography variant="h6">
              Address: {order?.user?.address}
            </Typography>
            <Typography variant="h6">
              Phone Number: {order?.user?.phoneNumber}
            </Typography>
            <Typography variant="h6">Email: {order?.user?.email}</Typography>
            <Typography variant="h6">
              Purchase Date:{" "}
              {order?.purchaseDate
                ? new Date(order?.purchaseDate).toLocaleDateString()
                : "UNPAID"}
            </Typography>
            <Typography variant="h6">
              Status: <CustomStatus status={order?.status} />
            </Typography>
            <Typography variant="h6">Bill ID: {order?.billId}</Typography>

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
                  {order?.products?.map((product) => (
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
          <Typography>No order found</Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => router.push("/admin/order")}
        >
          Back to Orders
        </Button>
      </Paper>
    </Box>
  );
};

export default OrderDetailPage;
