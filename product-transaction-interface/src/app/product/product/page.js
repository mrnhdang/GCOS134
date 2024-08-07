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
} from "@mui/material";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { fetchListProduct } from "../../../client/product_api";

const ProductHomePage = () => {
  //điều hướng đến 1 trang khác dùng userRouter của Navigation ko dùng của next/Router
  const router = useRouter();

  const [listProduct, setListProduct] = useState([]);

  const bannerImages = [
    "https://sabeco.com.vn/Data/Sites/1/media/icon/saigon-special-2022.png",
    "https://via.placeholder.com/1920x200",
    "https://via.placeholder.com/1920x200",
  ];

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
      alert("Please enter a username");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-whiteGray relative">
      <Box className="bg-gray-100">
        <Box className="bg-black text-white py-4 h-[100px] w-full  top-0 fixed z-10">
          <Box className="container mx-auto flex justify-between items-center mt-2 ">
            <Typography variant="h6" className="ml-2 mt-2 h-[50px] w-[50px]">
              <img
                src="https://pda01.esales.vn/HuongThuyITG_IMG/BELL_Ver2.JPG"
                className="rounded-lg"
              />
            </Typography>
            <Box>
              <Button color="inherit">Home</Button>
              <Button color="inherit">Products</Button>
              <Button color="inherit">About</Button>
              <Button color="inherit">Contact</Button>
            </Box>
          </Box>
        </Box>

        <Box className="container mx-auto w-screen mt-[260px] z-20">
          <Carousel autoPlay infiniteLoop showThumbs={false}>
            {bannerImages.map((image, index) => (
              <Box key={index}>
                <img
                  src={image}
                  alt={`Banner ${index}`}
                  className="w-full h-64 object-cover mx-2"
                />
              </Box>
            ))}
          </Carousel>
        </Box>

        <Box className="container mx-auto my-2 mt-[30px]">
          <div className="mx-2 flex justify-center mb-3">
            <h4 className="text-black text-[20px] font-bold">Product list</h4>
          </div>
          <Grid container spacing={4}>
            {listProduct.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card sx={{ maxWidth: 345 }} className="ml-14">
                  <CardMedia
                    sx={{ height: 140 }}
                    image="https://imgs.search.brave.com/GBvclPeg6_bizZucEymzcRtvirdFZelMEFv-X4_VQnQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sdW9t/YmFjbGUuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy9UaHVuZy0y/NC1Mb24tQmlhLUxh/Yy1WaWV0LTMzMG1s/LmpwZw"
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      Name product: {product.productName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Price product: {product.price} $
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => {
                        router.push(`/product/${product.id}`);
                      }}
                    >
                      Detail
                    </Button>
                    <Button size="small">Add to Cart</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </div>
  );
};
export default ProductHomePage;
