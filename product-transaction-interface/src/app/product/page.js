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

const ProductHomePage = () => {
  //điều hướng đến 1 trang khác dùng userRouter của Navigation ko dùng của next/Router
  const router = useRouter();

  const [listProduct, setListProduct] = useState([]);

  const products = [
    {
      id: 1,
      image:
        "https://imgs.search.brave.com/GBvclPeg6_bizZucEymzcRtvirdFZelMEFv-X4_VQnQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sdW9t/YmFjbGUuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy9UaHVuZy0y/NC1Mb24tQmlhLUxh/Yy1WaWV0LTMzMG1s/LmpwZw",
      title: "Product 1",
      description: "Description of Product 1",
    },
    {
      id: 2,
      image:
        "https://imgs.search.brave.com/GBvclPeg6_bizZucEymzcRtvirdFZelMEFv-X4_VQnQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sdW9t/YmFjbGUuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy9UaHVuZy0y/NC1Mb24tQmlhLUxh/Yy1WaWV0LTMzMG1s/LmpwZw",
      title: "Product 2",
      description: "Description of Product 2",
    },
    {
      id: 3,
      image:
        "https://imgs.search.brave.com/GBvclPeg6_bizZucEymzcRtvirdFZelMEFv-X4_VQnQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sdW9t/YmFjbGUuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy9UaHVuZy0y/NC1Mb24tQmlhLUxh/Yy1WaWV0LTMzMG1s/LmpwZw",
      title: "Product 3",
      description: "Description of Product 3",
    },
    {
      id: 3,
      image:
        "https://imgs.search.brave.com/GBvclPeg6_bizZucEymzcRtvirdFZelMEFv-X4_VQnQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sdW9t/YmFjbGUuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy9UaHVuZy0y/NC1Mb24tQmlhLUxh/Yy1WaWV0LTMzMG1s/LmpwZw",
      title: "Product 3",
      description: "Description of Product 3",
    },
    {
      id: 3,
      image:
        "https://imgs.search.brave.com/GBvclPeg6_bizZucEymzcRtvirdFZelMEFv-X4_VQnQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sdW9t/YmFjbGUuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy9UaHVuZy0y/NC1Mb24tQmlhLUxh/Yy1WaWV0LTMzMG1s/LmpwZw",
      title: "Product 3",
      description: "Description of Product 3",
    },
    {
      id: 3,
      image:
        "https://imgs.search.brave.com/GBvclPeg6_bizZucEymzcRtvirdFZelMEFv-X4_VQnQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sdW9t/YmFjbGUuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy9UaHVuZy0y/NC1Mb24tQmlhLUxh/Yy1WaWV0LTMzMG1s/LmpwZw",
      title: "Product 3",
      description: "Description of Product 3",
    },
    {
      id: 3,
      image:
        "https://imgs.search.brave.com/GBvclPeg6_bizZucEymzcRtvirdFZelMEFv-X4_VQnQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sdW9t/YmFjbGUuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy9UaHVuZy0y/NC1Mb24tQmlhLUxh/Yy1WaWV0LTMzMG1s/LmpwZw",
      title: "Product 3",
      description: "Description of Product 3",
    },
    {
      id: 3,
      image:
        "https://imgs.search.brave.com/GBvclPeg6_bizZucEymzcRtvirdFZelMEFv-X4_VQnQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sdW9t/YmFjbGUuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy9UaHVuZy0y/NC1Mb24tQmlhLUxh/Yy1WaWV0LTMzMG1s/LmpwZw",
      title: "Product 3",
      description: "Description of Product 3",
    },
    {
      id: 3,
      image:
        "https://imgs.search.brave.com/GBvclPeg6_bizZucEymzcRtvirdFZelMEFv-X4_VQnQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sdW9t/YmFjbGUuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy9UaHVuZy0y/NC1Mb24tQmlhLUxh/Yy1WaWV0LTMzMG1s/LmpwZw",
      title: "Product 3",
      description: "Description of Product 3",
    },
    // Add more products as needed
  ];

  useEffect(() => {
    getListProduct();
  }, []);

  const getListProduct = async () => {
    try {
      const listDataProduct = await fetchListProduct();
      setListProduct(listDataProduct);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-full max-h-screen">
      <Paper sx={{ p: 2 }}>
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={6} sm={4} md={2} key={product.id}>
              <Card
                sx={{
                  width: "200px",
                  height: "300px",
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
                  sx={{ height: 140 }}
                  image="https://cdn.tgdd.vn/Products/Images/44/235405/acer-aspire-7-a715-42g-r4st-r5-nhqaysv004-16-600x600.jpg"
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
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
      </Paper>
    </div>
  );
};
export default ProductHomePage;
