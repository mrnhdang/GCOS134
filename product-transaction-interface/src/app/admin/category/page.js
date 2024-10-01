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
  IconButton,
  CircularProgress,
  Button,
} from "@mui/material";
import axios from "axios";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import CategoryDialog from "@/components/admin/category/CategoryDialog";

const CategoryPage = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8080/api/v1/category");
      setCategoryList(res?.data);
    } catch (e) {
      console.error("Error fetching category data:", e);
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/category/${id}`);
      getCategoryList();
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Failed to delete category");
    }
  };

  return (
    <Box sx={{ p: 3, height: "100%", minHeight: "100vh" }}>
      <Paper
        elevation={3}
        sx={{ p: 3, mb: 3, backgroundColor: "#f5f5f5", borderRadius: 3 }}
        className="space-y-2"
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}
        >
          Category Management
        </Typography>
        <CategoryDialog
          setLoading={setLoading}
          getCategoryList={getCategoryList}
        />
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
                  <TableCell sx={{ fontWeight: "bold" }}>Category ID</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Category Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categoryList ? (
                  categoryList.map((category) => (
                    <TableRow
                      key={category?.id}
                      sx={{ "&:hover": { backgroundColor: "#f0f0f0" } }}
                    >
                      <TableCell>{category?.id}</TableCell>
                      <TableCell>{category?.categoryName}</TableCell>
                      <TableCell>
                        {/* <IconButton
                          onClick={() =>
                            router.push(`/admin/category/${category?.id}`)
                          }
                          sx={{ color: "#1976d2" }}
                        >
                          <EditOutlinedIcon />
                        </IconButton> */}
                        <IconButton
                          onClick={() => deleteCategory(category?.id)}
                          sx={{ color: "#d32f2f" }}
                        >
                          <DeleteOutlinedIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3}>
                      <Typography textAlign="center">
                        No Categories Found
                      </Typography>
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

export default CategoryPage;
