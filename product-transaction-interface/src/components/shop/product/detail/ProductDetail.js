"use client";

import { CartStateContext } from "@/provider/CartContext";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

const ProductDetail = ({ id }) => {
  const [uiState, setUiState] = useState();
  const [product, setProduct] = useState();

  const { addToCart } = useContext(CartStateContext);

  const handleGetProductDetail = async () => {
    try {
      setUiState({ loading: true });
      const res = await axios.get(`http://localhost:8080/api/v1/product/${id}`);

      setProduct(res?.data);
      setUiState({ loading: false });
    } catch (error) {
      const message = error?.response?.data?.message;

      setUiState({
        loading: false,
        error: message,
      });
    }
  };

  useEffect(() => {
    handleGetProductDetail();
  }, []);

  return (
    <div className="h-full min-h-screen flex flex-col justify-center items-center space-y-1 px-10">
      {uiState?.success && (
        <Alert color="success" severity="success">
          {uiState?.success}
        </Alert>
      )}
      {uiState?.error && (
        <Alert color="error" severity="error">
          {uiState?.error}
        </Alert>
      )}
      {uiState?.loading ? (
        <CircularProgress />
      ) : (
        <Box
          sx={{
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "12px",
            width: "80%",
            height: "fit-content",
            justifyItems: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid container spacing={2}>
            {/* Left section: Product Image */}
            <Grid item xs={12} md={6}>
              <img
                src={product?.image} // Replace with your image
                alt="Product"
                style={{ width: "100%", borderRadius: "12px" }}
              />
            </Grid>

            {/* Right section: Product Details */}
            <Grid item xs={12} md={6} sx={{ p: 2 }}>
              <h1 className="font-bold text-3xl">{product?.productName}</h1>
              <div className="w-full">
                <Typography variant="body1" color="textSecondary">
                  Category: {product?.category?.categoryName}
                </Typography>
                <Typography
                  variant="h5"
                  style={{ marginTop: "1rem", color: "red" }}
                >
                  {product?.price} VND
                </Typography>
                <TextField
                  fullWidth
                  sx={{ marginTop: "1rem" }}
                  id="outlined-multiline-static"
                  label="Your feedback"
                  multiline
                  rows={7}
                />
              </div>
            </Grid>
          </Grid>
          {/* Fixed Footer for Cart Summary */}
          <div className="flex justify-end">
            <Button
              variant="outlined"
              color="primary"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </Button>
          </div>
        </Box>
      )}
    </div>
  );
};
export default ProductDetail;
