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
  TextField,
  InputAdornment,
  OutlinedInput,
  FormControl,
  InputLabel,
} from "@mui/material";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import axios from "axios";
import CustomSnackbar from "@/generic/CustomSnackbar";
import { CartStateContext } from "@/provider/CartContext";
import CategoryList from "@/components/shop/category/CategoryList";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const ProductHomePage = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [listProduct, setListProduct] = useState([]);
  const [uiState, setUiState] = useState();
  const [category, setCategory] = useState([]);
  const [checked, setChecked] = useState();

  const router = useRouter();
  const { addToCart } = useContext(CartStateContext);

  console.log(category[checked])

  const getListProduct = async () => {
    let res;
    try {
      setUiState({ loading: true });
      if (category[checked]) {
        res = await axios.get(
          `http://localhost:8080/api/v1/product/category/${category[checked]?.id}`
        );
      } else {
        res = await axios.get("http://localhost:8080/api/v1/product");
      }

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

  const getListCategory = async () => {
    try {
      setUiState({ loading: true });
      const res = await axios.get("http://localhost:8080/api/v1/category");
      setCategory(res?.data);
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

  useEffect(() => {
    getListProduct();
  }, [checked]);

  useEffect(() => {
    getListCategory();
  }, []);

  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-start space-y-10">
      <FormControl className="bg-white w-1/2 rounded-lg p-2" variant="outlined">
        <OutlinedInput
          id="outlined-adornment-search"
          placeholder="Search product..."
          endAdornment={
            <InputAdornment position="end">
              <IconButton edge="end">
                <SearchOutlinedIcon width={30} />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

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

      <div className="flex w-full space-x-2">
        <CategoryList
          category={category}
          checked={checked}
          setChecked={setChecked}
        />
        {!uiState?.loading ? (
          <Grid
            container
            sx={{
              p: 2,
              width: "85%",
              height: "100%",
              backgroundColor: "white",
              justifyContent: "center",
              borderRadius: "12px",
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
    </div>
  );
};
export default ProductHomePage;
