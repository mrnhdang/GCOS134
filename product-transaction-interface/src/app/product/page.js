"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Grid,
  Typography,
  Button,
  CardMedia,
  CardContent,
  CardActions,
  Card,
  Paper,
  IconButton,
} from "@mui/material";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import axios from "axios";

const ProductHomePage = () => {
  //điều hướng đến 1 trang khác dùng userRouter của Navigation ko dùng của next/Router
  const router = useRouter();

  const [listProduct, setListProduct] = useState([]);

  useEffect(() => {
    getListProduct();
  }, []);

  const getListProduct = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/product");
      setListProduct(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-full h-full flex justify-center">
      <Grid container spacing={2} sx={{ p: 2, width: "85%", height: "100%", backgroundColor: "white" }}>
        {listProduct?.map((product) => (
          <Grid item xs={6} sm={4} md={2} key={product.id}>
            <Card
              sx={{
                width: "200px",
                height: "500px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                justifyItems: "stretch",
                alignContent: "centers",
                gap: 1,
                p: 1,
              }}
            >
              <CardMedia
                sx={{ height: "100%" }}
                image={product.image}
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="a" component="div">
                  {product.productName || "testing"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.price || 1000000} VND
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton
                  size="small"
                  onClick={() => {
                    router.push(`/product/${product.id}`);
                  }}
                >
                  <VisibilityOutlinedIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => {
                    router.push(`/product/${product.id}`);
                  }}
                >
                  <AddShoppingCartOutlinedIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
export default ProductHomePage;
