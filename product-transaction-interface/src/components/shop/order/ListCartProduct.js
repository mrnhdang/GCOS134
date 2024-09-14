"use client";
import { CartStateContext } from "@/provider/CartContext";
import { useCallback, useContext, useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";

const {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
} = require("@mui/material");

const ListCartProduct = () => {
  const { cart, removeFromCart } = useContext(CartStateContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();

  const handlePlaceOrder = () => {
    router.push("/product/bill");
  };
  const handleRemoveProductFromPayment = useCallback(
    (product) => {
      removeFromCart(product);
      setTotalPrice(
        cart.reduce((total, item) => {
          return total + item.price * item.quantity;
        }, 0)
      );
    },
    [cart]
  );

  useEffect(() => {
    setTotalPrice(
      cart?.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0)
    );
  }, [cart]);

  return (
    <div className="h-full w-full flex flex-col items-center p-2">
      <div className="w-3/5 flex flex-col items-center gap-1">
        <h1 className="self-start font-bold text-2xl text-gray-500 mb-2">
          ORDER
        </h1>
        <div className="flex justify-center align-middle items-start border border-solid border-white w-full bg-gray-200 rounded-lg p-2 mb-1">
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
                className="flex justify-center align-middle items-center space-x-2 w-fit border border-solid border-white bg-white rounded-lg "
                key={index}
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
            <h1 className="font-bold text-xl bg-pink-400 w-fit p-2 rounded-lg text-white self-end">
              Total: <span>{totalPrice}</span>
            </h1>
          </List>
        </div>

        <Button variant="outlined" fullWidth onClick={() => handlePlaceOrder()}>
          Place Order
        </Button>
      </div>
    </div>
  );
};
export default ListCartProduct;
