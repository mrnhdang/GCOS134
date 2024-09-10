"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function ProductDetailPage({ params }) {
  const parame = params.productId;
  const [productDetail, setProductDetail] = useState({});
  const router = useRouter();

  useEffect(() => {
    getProductDetail();
  }, []);

  const getProductDetail = async () => {
    try {
      const productDetail = await fetchDetailProduct(parame);
      setProductDetail(productDetail);
    } catch (e) {
      alert("Please enter a username");
    }
  };

  return (
    <div>
      <div className="mt-2"></div>
      <Box>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Box
              component="img"
              src="https://imgs.search.brave.com/GBvclPeg6_bizZucEymzcRtvirdFZelMEFv-X4_VQnQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sdW9t/YmFjbGUuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy9UaHVuZy0y/NC1Mb24tQmlhLUxh/Yy1WaWV0LTMzMG1s/LmpwZw"
              // alt=}
              width="70%"
              height="auto"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            {productDetail && (
              <Box>
                <Typography variant="h4" gutterBottom>
                  Name product: {productDetail.productName}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Description product: Mô tả
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Price product: {productDetail.price}$
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  width="20%"
                  style={{ marginTop: "16px" }}
                  onClick={() => {
                    console.log(parame);
                  }}
                >
                  Add to Cart
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
