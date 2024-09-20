"use client";
import { useEffect, useState } from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import axios from "axios";

const CategoryPage = () => {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/category");
      setCategoryList(res?.data);
    } catch (e) {
      console.error("Error fetching category data:", e);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3, backgroundColor: "#f5f5f5", borderRadius: 3 }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', textAlign: "center", mb: 2 }}>
          Category Management
        </Typography>

        <TableContainer component={Paper} sx={{ boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#e0f7fa" }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Category ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Category Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categoryList? (
                categoryList.map((category) => (
                  <TableRow key={category?._id} sx={{ '&:hover': { backgroundColor: "#f0f0f0" } }}>
                    <TableCell>{category?.id}</TableCell>
                    <TableCell>{category?.categoryName}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3}>
                    <Typography textAlign="center">No Categories Found</Typography>
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

export default CategoryPage;
