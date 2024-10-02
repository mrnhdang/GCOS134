"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import axios from "axios";

export default function AddProductForm() {
  const [productName, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const router = useRouter();

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/category");
      setCategories(response?.data);
    } catch (e) {
      console.error("Error getting category", e);
    }
  };

  const handleAddProduct = async () => {
    try {
      const payload = {
        productName: productName,
        price: price,
        image: image,
        categoryId: selectedCategory,
      };
      console.log(payload);
      const res = await axios.post(
        `http://localhost:8080/api/v1/product`,
        payload
      );

      alert("Add is Success");
      router.push("/admin");
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = (e) => {
    handleAddProduct();
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Paper
        elevation={3}
        sx={{ p: 4, width: "500px", backgroundColor: "#f9f9f9" }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: "center", fontWeight: "bold", mb: 3 }}
        >
          Add New Product
        </Typography>

        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <TextField
            label="Product Name"
            variant="outlined"
            value={productName}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
          />

          <TextField
            label="Price"
            variant="outlined"
            value={price}
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            required
            fullWidth
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories?.map((cat) => (
                <MenuItem key={cat?.id} value={cat?.id}>
                  {cat?.categoryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Image Url"
            variant="outlined"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            fullWidth
          />

          <Button
            onClick={() => handleAddProduct()}
            variant="contained"
            color="primary"
            fullWidth
            sx={{ paddingY: 1.5, fontWeight: "bold" }}
          >
            Save
          </Button>
        </Box>
      </Paper>
    </div>
  );
}
