"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Grid,
  Typography,
  CardMedia,
  CardContent,
  CardActions,
  Card,
  IconButton,
  Modal,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import axios from "axios";
import CustomSnackbar from "@/generic/CustomSnackbar";
import { CartStateContext } from "@/provider/CartContext";

const ProductHomePage = () => {
  //điều hướng đến 1 trang khác dùng userRouter của Navigation ko dùng của next/Router
  const router = useRouter();
  const { addToCart } = useContext(CartStateContext);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [listProduct, setListProduct] = useState([]);
  const [uiState, setUiState] = useState();

  useEffect(() => {
    getListProduct();
  }, []);

  const getListProduct = async () => {
    try {
      setUiState({ loading: true });
      const res = await axios.get("http://localhost:8080/api/v1/product");
      setListProduct(res?.data);
      setUiState({ loading: false });
    } catch (error) {
      const message = error?.response?.data?.message;
      setUiState({
        loading: false,
        error: message,
      });
    }
  };

  const handleOpenCartModal = (product) => {
    addToCart(product);
    setOpenSnackbar(true);
  };

  return (
    <div className="w-full h-full min-h-screen flex justify-center">
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
      <CustomSnackbar
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
      />
      {!uiState?.loading ? (
        <Grid
          container
          sx={{
            p: 2,
            width: "85%",
            height: "100%",
            backgroundColor: "white",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {listProduct?.map((product) => (
            <Grid
              sx={{
                width: "100%",
                height: "100%",
                marginBottom: 1,
                flexShrink: "inherit",
              }}
              item
              xs={6}
              sm={4}
              md={2}
              key={product.id}
            >
              <Card
                sx={{
                  width: "200px",
                  height: "350px",
                  display: "flex",
                  flexDirection: "column",
                  alignContent: "centers",
                }}
              >
                <CardMedia sx={{ height: "100%" }} image={product?.image} />
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
                  <Tooltip title="Add to cart">
                    <IconButton
                      size="small"
                      onClick={() => handleOpenCartModal(product)}
                    >
                      <AddShoppingCartOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};
export default ProductHomePage;
