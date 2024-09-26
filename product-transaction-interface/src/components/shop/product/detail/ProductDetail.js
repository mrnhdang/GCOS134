"use client";

import { CartStateContext } from "@/provider/CartContext";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
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
    <div className="h-full min-h-screen flex justify-center px-10">
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
              <Grid item xs={12} md={6} sx={{ p: 2 }}>
                <h1 className="text-2xl">{product?.category?.categoryName}</h1>
                <h1 className="text-2xl">{product?.price}</h1>
              </Grid>
            </Grid>
          </Grid>

          {/* Fixed Footer for Cart Summary */}
          <Box
            sx={{
              position: "fixed",
              backdropFilter: "blur(10px)",
              bottom: 20, // Adjust this value to control the distance from the bottom of the screen
              left: "50%",
              transform: "translateX(-50%)", // Center the box horizontally
              padding: "20px",
              paddingX: "80px",
              // border: "1px solid #ccc",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Optional: Add some shadow for visual effect
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "90%", // Control the width of the summary box
            }}
          >
            <h1 className="font-bold text-xl">{product?.productName}</h1>

            <div className="flex align-middle justify-center items-center space-x-2">
              <h1>
                {product?.price}
                <a className="underline">đ</a>
              </h1>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </Button>
            </div>
          </Box>
        </Box>
      )}
    </div>
  );
};
export default ProductDetail;
