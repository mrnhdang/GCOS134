"use client";
import { CartStateContext } from "@/provider/CartContext";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";
import axios from "axios";
import { formatNumberWithDots } from "@/util";

const {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  Paper,
  CircularProgress,
  Alert,
} = require("@mui/material");

const ListCartProduct = () => {
  const { cart, removeFromCart } = useContext(CartStateContext);
  const [uiState, setUiState] = useState({ loading: false });
  const router = useRouter();

  const handlePlaceOrder = async () => {
    try {
      setUiState({ loading: true });
      const payload = {
        userId: localStorage.getItem("id"),
        products: cart?.map((product) => ({
          productId: product?.id,
          orderAmount: product?.quantity,
          productName: product?.productName,
          price: product?.price,
        })),
      };
      const res = await axios.post(
        "http://localhost:8080/api/v1/order",
        payload
      );
      router.push(`/shop/order/${res?.data?.id}`);
    } catch (error) {
      const message = error?.response?.data?.message;
      setUiState({
        loading: false,
        error: message,
      });
    }
  };

  const handleRemoveProductFromPayment = useCallback(
    (product) => {
      removeFromCart(product);
    },
    [cart]
  );

  const totalPrice = useMemo(
    () =>
      cart?.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0),
    [cart]
  );

  return (
    <div className="h-full w-full flex flex-col items-center p-2 min-h-screen">
      <div className="w-3/5 flex flex-col items-center gap-1">
        <div className="flex flex-col justify-center align-middle items-center border border-solid border-white w-full bg-gray-200 rounded-lg p-4 mb-1">
          <h1 className="self-start font-bold text-2xl mb-2">CART</h1>
          {uiState?.loading && <CircularProgress />}
          {uiState?.error && (
            <Alert severity="error" color="error">
              {uiState?.error}
            </Alert>
          )}
          <List
            sx={{
              width: "fit-content",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
              gap: 1,
            }}
          >
            {cart?.map((product, index) => (
              <ListItem
                className="flex justify-center align-middle items-center space-x-2 w-fit border border-solid border-white bg-white rounded-lg shadow-xl mb-1 hover:scale-105 duration-200"
                key={index}
                components={Paper}
                elevation={3}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleRemoveProductFromPayment(product)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <img src={product?.image} className="w-32 h-32" />
                <ListItemText
                  className="w-[500px]"
                  primary={product?.productName}
                  secondary={product?.price}
                />
                <p className="bg-blue-400 w-8 h-8 p-1 rounded-lg text-center align-middle text-white font-bold">
                  {product?.quantity}
                </p>
              </ListItem>
            ))}
            <h1 className="flex flex-col items-end self-end text-blue-500 border border-solid border-white p-2 rounded-lg">
              Total:
              <span className=" text-2xl font-bold">
                {formatNumberWithDots(totalPrice)}
              </span>
            </h1>
          </List>
        </div>
        {cart?.length > 0 && (
          <Button
            variant="outlined"
            fullWidth
            onClick={() => {
              handlePlaceOrder();
            }}
          >
            Place Order
          </Button>
        )}
      </div>
    </div>
  );
};
export default ListCartProduct;
