"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Grid,
  Typography,
  Button,
  CardMedia,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const AdminPage = () => {
  const router = useRouter();
  const [listProduct, setListProduct] = useState([]);

  // Fetch products from API
  useEffect(() => {
    getListProduct();
  }, []);

  const getListProduct = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/product");
      setListProduct(res?.data);
    } catch (e) {
      console.log(e);
    }
  };

  // Delete product
  const handleDeleteProduct = async (productId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:8080/api/v1/product/${productId}`);
        alert("Product has been deleted!");
        getListProduct();
      } catch (e) {
        console.error("Error deleting product:", e);
        alert("Failed to delete the product.");
      }
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
          Product Management
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/admin/product/add")}
          sx={{
            mb: 3,
            backgroundColor: "#1976d2",
            fontWeight: "bold",
            px: 3,
            py: 1,
          }}
        >
          Add Product
        </Button>

        <TableContainer
          component={Paper}
          sx={{ boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)" }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#e0f7fa" }}>
                <TableCell sx={{ fontWeight: "bold" }}>Image</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Product Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listProduct.length > 0 ? (
                listProduct.map((product) => (
                  <TableRow
                    key={product?.id}
                    sx={{ "&:hover": { backgroundColor: "#f0f0f0" } }}
                  >
                    <TableCell>
                      <CardMedia
                        sx={{ height: 60, width: 60, borderRadius: 2 }}
                        image={
                          product?.image || "https://via.placeholder.com/60"
                        }
                        title={product?.productName}
                      />
                    </TableCell>
                    <TableCell>{product?.productName}</TableCell>
                    <TableCell>{product?.price} VND</TableCell>
                    <TableCell>{product?.category?.categoryName}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() =>
                          router.push(`/admin/product/${product?.id}`)
                        }
                        sx={{ color: "#1976d2" }}
                      >
                        <EditOutlinedIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteProduct(product?.id)}
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
                    <Typography textAlign="center">No Product</Typography>
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

export default AdminPage;
