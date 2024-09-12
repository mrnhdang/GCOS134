"use client"
import { CartStateContext } from "@/provider/CartContext";
import { useContext, useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from "next/navigation";

const { List, ListItem, ListItemText, IconButton, Button } = require("@mui/material");

const ListCartProduct = () => {
    const { cart, removeFromCart } = useContext(CartStateContext)
    const [totalPrice, setTotalPrice] = useState(0);
    const router = useRouter();

    const handlePlaceOrder = () => {
        router.push("/product/bill");
    }
    const handleRemoveProductFromPayment = (product) => {
        removeFromCart(product);
        setTotalPrice(cart.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0))
    }

    useEffect(() => {
        setTotalPrice(cart?.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0))
    }, [cart])

    return (
        <div className="h-screen w-full flex flex-col items-center">
            <div className="flex justify-center align-middle">
                <List sx={{ width: "fit-content", display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", gap: 1 }}>
                    {cart?.map((product, index) => (
                        <ListItem className="flex justify-center align-middle items-center space-x-2 w-fit border border-solid border-white bg-white rounded-lg " key={index} secondaryAction={
                            <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveProductFromPayment(product)} >
                                <DeleteIcon />
                            </IconButton>
                        }>
                            <img src={product?.image} className="w-32 h-32" />
                            <ListItemText primary={product?.productName} secondary={product?.price} />
                            <p className="bg-blue-400 w-8 h-8 rounded-lg text-center align-middle text-white font-bold">
                                {product?.quantity}
                            </p>
                        </ListItem>
                    ))}
                    <h1 className="font-bold text-xl bg-pink-400 w-fit p-2 rounded-lg text-white self-end">Total: <span>{totalPrice}</span></h1>
                </List>
            </div>

            <Button className="w-1/2" onClick={() => handlePlaceOrder()}>Place Order</Button>
        </div>

    )
}
export default ListCartProduct;