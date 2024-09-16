"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";
import axios from "axios";

export default function AddProductForm() {
  const [productName, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const router = useRouter();

  const handleAddProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("price", price);
      if (image) {
        formData.append("image", image);
      }

      const res = await axios.post("http://localhost:8080/api/v1/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        alert("Product added successfully");
        router.push("/admin");
      } else {
        alert("Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error while adding product");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddProduct();
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Paper elevation={3} sx={{ p: 4, width: "500px", backgroundColor: "#f9f9f9" }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: "center", fontWeight: "bold", mb: 3 }}>
          Add New Product
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
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

          <label htmlFor="image-upload" className="w-full">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px dashed #ccc",
                borderRadius: 2,
                height: "150px",
                cursor: "pointer",
              }}
            >
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Product"
                  style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                />
              ) : (
                <Typography variant="body2" color="textSecondary">
                  Upload Image
                </Typography>
              )}
            </Box>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </label>

          <Button
            type="submit"
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
