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
            width: "90%",
            // height: "fit-content",
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
              <Typography variant="h4">{product?.productName}</Typography>

              {/* Style */}
              <Box sx={{ marginTop: "20px" }}>
                <Typography variant="h6">Style</Typography>
                {["Minimal", "Bohemian", "Floral", "Other"].map((s) => (
                  <Button key={s} sx={{ marginRight: "10px" }}>
                    {s}
                  </Button>
                ))}
              </Box>

              {/* Color */}
              <Box sx={{ marginTop: "20px" }}>
                <Typography variant="h6">Color</Typography>
                {["Green", "Blue", "White", "Pink"].map((c) => (
                  <Button key={c} sx={{ marginRight: "10px" }}>
                    {c}
                  </Button>
                ))}
              </Box>

              {/* Size */}
              <Box sx={{ marginTop: "20px" }}>
                <Typography variant="h6">Size</Typography>
                {["Twin XL", "Full"].map((s) => (
                  <Button key={s} sx={{ marginRight: "10px" }}>
                    {s}
                  </Button>
                ))}
              </Box>
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
              border: "1px solid #ccc",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Optional: Add some shadow for visual effect
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "90%", // Control the width of the summary box
            }}
          >
            <Typography variant="h6">{product?.productName}</Typography>
            <Typography variant="h6" className="font-bold">
              {product?.price} (VND)
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      )}
    </div>
  );
};
export default ProductDetail;
