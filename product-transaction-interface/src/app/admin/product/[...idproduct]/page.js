"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  CardMedia,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";

export default function ProductForm({ params }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const router = useRouter();
  const idParam = params.idproduct;
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    getProductDetail();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/category");
      setCategories(response?.data);
    } catch (e) {
      console.error("Error fetching categories", e);
    }
  };

  const getProductDetail = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/product/${idParam}`
      );

      const productDetail = response?.data;
      setName(productDetail?.productName);
      setPrice(productDetail?.price);
      setImage(productDetail?.image);
      setSelectedCategory(productDetail?.category?.id);
    } catch (e) {
      alert("Failed to load product details");
      console.error(e);
    }
  };

  const handleEdit = async () => {
    try {
      const payload = {
        productName: name,
        price: price,
        image: image,
        categoryId: selectedCategory,
      };
      console.log(payload);
      const res = await axios.patch(
        `http://localhost:8080/api/v1/product/${idParam}`,
        payload
      );

      alert("Edit is Success");
      router.push("/admin");
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = (e) => {
    handleEdit();
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        padding: "2rem",
      }}
    >
      <Box
        component="form"
        sx={{
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0px 0px 15px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Edit Product
        </Typography>

        <TextField
          label="Product Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 3 }}
        />

        <TextField
          label="Price"
          variant="outlined"
          fullWidth
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          sx={{ mb: 3 }}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.categoryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ mb: 3, textAlign: "center" }}>
          {image ? (
            <CardMedia
              component="img"
              src={
                typeof image === "string" ? image : URL.createObjectURL(image)
              }
              alt="Product Image"
              sx={{
                width: "100%",
                height: "auto",
                maxHeight: "300px",
                objectFit: "contain",
                marginBottom: "16px",
              }}
            />
          ) : (
            <Typography variant="body2" color="textSecondary">
              No Image
            </Typography>
          )}

          <Button variant="contained" component="label">
            Upload Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </Button>
        </Box>
        <Button
          onClick={() => handleEdit()}
          variant="contained"
          color="primary"
          fullWidth
          sx={{ paddingY: 1.5, fontWeight: "bold" }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}
