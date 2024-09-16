"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TextField, Button, Typography, Box, CardMedia } from "@mui/material";
import axios from "axios";

export default function ProductForm({ params }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const router = useRouter();
  const idParam = params.idproduct;
  const [productDetail, setProductDetail] = useState({});

  useEffect(() => {
    getProductDetail();
  }, []); 

  const getProductDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/product/${idParam}`);
      
  
      const productDetail = response.data;
      setProductDetail(productDetail);
      setName(productDetail.productName);
      setPrice(productDetail.price);
      setImage(productDetail.image);
    } catch (e) {
      alert("Please enter username !");
      console.error(e);
    }
  };

  const handleEdit = async () => {
    try {
      const isEditProduct = await editProduct(idParam, name, price, image);
      if (isEditProduct) {
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
            Upload
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
          sx={{ padding: '12px', fontSize: '16px' }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}
