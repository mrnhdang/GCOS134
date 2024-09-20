"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, } from "@mui/material";
import axios from "axios";

const OrderPage = () => {
  const router = useRouter();
  const [listOrder, setListOrder] = useState([]);

  useEffect(() => {
    getListOrder();
  }, []);

  const getListOrder = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/order");
      setListOrder(res?.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3, backgroundColor: "#f5f5f5", borderRadius: 3 }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', textAlign: "center", mb: 2 }}>
          Order Management
        </Typography>

        <TableContainer component={Paper} sx={{ boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#e0f7fa" }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Order Information</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Products</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listOrder? (
                listOrder?.map((order) => (
                    <TableRow key={order?._id} sx={{ '&:hover': { backgroundColor: "#f0f0f0" } }}>
                  <TableCell>
                    <Typography variant="body1"><b>Order ID:</b> {order?._id}</Typography>
                    <Typography variant="body1"><b>Purchase Date:</b> {new Date(order?.purchaseDate).toLocaleDateString()}</Typography>
                    <Typography variant="body1"><b>Status:</b> {order?.status}</Typography>
                    <Typography variant="body1"><b>User ID:</b> {order?.user?.username}</Typography>
                    <Typography variant="body1"><b>Bill ID:</b> {order?.billId}</Typography>
                  </TableCell>
                  <TableCell>
                      {order?.products?.map((product, index) => (
                        <Typography key={index} variant="body2">
                          {product?.productName} - {product?.orderAmount} pcs - {product?.price} VND
                        </Typography>
                      ))}
                  </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7}>
                    <Typography textAlign="center">No Orders Found</Typography>
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

export default OrderPage;
