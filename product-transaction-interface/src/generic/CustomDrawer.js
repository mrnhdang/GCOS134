"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import {
  Avatar,
  Button,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { CartStateContext } from "@/provider/CartContext";
import { useRouter } from "next/navigation";

export default function CustomDrawer({ cart, openDrawer, setOpenDrawer }) {
  const router = useRouter();
  const { removeFromCart, setCart } = React.useContext(CartStateContext);

  const handleChangeProductQuantity = (product, e, index) => {
    const updateQuantity = e.target.value;
    let updateCart = [...cart]; // Replace with your actual cart state variable

    if (updateQuantity === "0" || !updateQuantity) removeFromCart(product);

    if (index > 0 && index < updateCart?.length) {
      updateCart[index].quantity = updateQuantity;

      setCart(updateCart);
    }
  };

  return (
    <div>
      <Drawer
        anchor={"right"}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Box role="presentation" sx={{ height: "100%", p: 1 }}>
          <h1 className="text-2xl font-bold">CART</h1>
          <List
            sx={{
              width: "100%",
              width: 500,
              maxWidth: 500,
              bgcolor: "background.paper",
            }}
          >
            {cart?.length > 0 ? (
              cart?.map((product, index) => {
                return (
                  <ListItem key={index}>
                    <ListItemAvatar>
                      <Avatar>
                        <img src={product?.img} className="w-full h-full" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      sx={{ width: 260 }}
                      primary={product?.productName}
                      secondary={product?.price}
                    />
                    <TextField
                      id="outlined-number"
                      type="number"
                      sx={{ width: "70px" }}
                      defaultValue={product?.quantity}
                      onChange={(e) =>
                        handleChangeProductQuantity(product, e, index)
                      }
                    />
                  </ListItem>
                );
              })
            ) : (
              <h1 className="text-gray-200 text-xl text-center">
                CART IS EMPTY
              </h1>
            )}
          </List>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => router.push("/product/order")}
          >
            Check out
          </Button>
        </Box>
      </Drawer>
    </div>
  );
}
