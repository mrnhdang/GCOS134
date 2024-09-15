"use client";
import { Badge, Box, Button, IconButton, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CustomDrawer from "@/generic/CustomDrawer";
import { useContext, useEffect, useState } from "react";
import { CartStateContext } from "@/provider/CartContext";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { AuthStateContext } from "@/provider/AuthContext";

const NAV_URL = [
  { label: "Home", url: "/product" },
  { label: "About", url: "/product/1" },
  { label: "Contact", url: "" },
];

const ShopLayout = ({ children }) => {
  const pathname = usePathname();
  const { cart } = useContext(CartStateContext);
  const { logout } = useContext(AuthStateContext);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [clock, setClock] = useState();

  const formatDate = (date) => {
    // Get day, month, year
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    // Get hours, minutes, seconds
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    // Format as dd/mm/yyyy : hh:mm:ss
    return {
      date: `${day}/${month}/${year}`,
      time: `${hours}:${minutes}:${seconds}`,
    };
  };

  useEffect(() => {
    setInterval(() => {
      setClock(formatDate(new Date()));
    }, 1000);
  }, [clock]);

  return (
    <div>
      <Box className="backdrop-blur-sm bg-white/30 p-2 scroll-smooth fixed w-screen z-50 top-0 font-mono px-10">
        <Box className="container mx-auto flex justify-between items-center align-middle">
          <Typography variant="h4" fontFamily={"monospace"}>
            G2
          </Typography>
          <div className="flex justify-end items-center align-middle text-xl space-x-5">
            {/* Nav link */}
            {NAV_URL?.map((item, index) => (
              <a
                className={`${
                  pathname === item.url ? "underline" : ""
                } hover:font-bold`}
                key={index}
                href={item.url}
              >
                {item.label}
              </a>
            ))}

            {/* Clock */}
            <h1 className="flex flex-col justify-center align-middle items-center border-[3px] border-solid border-white bg-gradient-to-tr from-white to to-slate-300 p-1 rounded-lg">
              <span>{clock?.time}</span>
              <span className="text-sm">{clock?.date}</span>
            </h1>

            {/* Cart */}
            <IconButton aria-label="cart" onClick={() => setOpenDrawer(true)}>
              <Badge badgeContent={cart ? cart?.length : "0"} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {/* Avatar */}
            <IconButton>
              <AccountCircleOutlinedIcon />
            </IconButton>
            <Button onClick={() => logout()}>Logout</Button>
          </div>
        </Box>
      </Box>
      <div className="w-full mt-20 h-full">
        <CustomDrawer
          cart={cart}
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
        />
        {children}
      </div>
    </div>
  );
};
export default ShopLayout;
