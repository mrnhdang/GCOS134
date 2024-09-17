"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TextField, Button, Typography, Box, CardMedia, Autocomplete } from "@mui/material";
import axios from "axios";

export default function ProductForm({ params }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const router = useRouter();
  const idParam = params.idproduct;
  const [productDetail, setProductDetail] = useState({});
  const [categories, setCategories] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState(null);
  

  useEffect(() => {
    getProductDetail();
    fetchCategories();
  }, []); 

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/category");
      setCategories(response.data); 
    } catch (e) {
      console.error("Error fetching categories", e);
    }
  };

  const getProductDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/product/${idParam}`);
      
  
      const productDetail = response?.data; 
      setProductDetail(productDetail);
      setName(productDetail.productName);
      setPrice(productDetail.price);
      setImage(productDetail.image);
      setSelectedCategory(productDetail.category); 
    } catch (e) {
      alert("Failed to load product details");
      console.error(e);
    }
  };

  const handleEdit = async () => {
    try {
      const formData = new FormData();
      formData.append("productName", name);
      formData.append("price", price);
      formData.append("category", selectedCategory?.idParam); 
      if (image && typeof image !== "string") {
        formData.append("image", image); 
      }

      const res = await axios.put(`http://localhost:8080/api/v1/product/${idParam}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 200) {
        alert("Edit is Success");
        router.push("/admin/product");
      } else {
        alert("Error Edit ");
      }
    } catch (e) {
      alert("Error API ");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEdit();
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f4f6f8',
        padding: '2rem',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          backgroundColor: '#fff',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0px 0px 15px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '500px',
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

        <Autocomplete
          options={categories}
          getOptionLabel={(option) => option.name}
          value={selectedCategory}
          onChange={(event, newValue) => setSelectedCategory(newValue)}
          renderInput={(params) => <TextField {...params} label="Category" required />}
          fullWidth
          sx={{ mb: 3 }}
        />
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          {image ? (
            <CardMedia
              component="img"
              src={typeof image === 'string' ? image : URL.createObjectURL(image)}
              alt="Product Image"
              sx={{
                width: '100%',
                height: 'auto',
                maxHeight: '300px',
                objectFit: 'contain',
                marginBottom: '16px',
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
          type="submit"
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
