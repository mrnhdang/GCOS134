"use client";
import { useEffect, useState } from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import axios from "axios";

const InventoryPage = () => {
  const [inventoryList, setInventoryList] = useState([]);

  useEffect(() => {
    getInventoryList();
  }, []);

  const getInventoryList = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/inventory");
      setInventoryList(res?.data);
    } catch (e) {
      console.error("Error fetching inventory:", e);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3, backgroundColor: "#f5f5f5", borderRadius: 3 }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', textAlign: "center", mb: 2 }}>
          Inventory Management
        </Typography>

        <TableContainer component={Paper} sx={{ boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#e0f7fa" }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Inventory ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Product Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventoryList? (
                inventoryList?.map((inventory) => (
                  <TableRow key={inventory?._id} sx={{ '&:hover': { backgroundColor: "#f0f0f0" } }}>
                    <TableCell>{inventory?.id}</TableCell>
                    <TableCell>{inventory?.product?.productName}</TableCell>
                    <TableCell>{inventory?.currentQuantity}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4}>
                    <Typography textAlign="center">No Inventory Items Found</Typography>
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

export default InventoryPage;
