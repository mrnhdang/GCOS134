"use client";
import { Badge, Box, IconButton, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CustomDrawer from "@/generic/CustomDrawer";
import { useContext, useState } from "react";
import { CartStateContext } from "@/provider/CartContext";

const NAV_URL = [
  { label: "Home", url: "/product" },
  { label: "About", url: "/product/1" },
  { label: "Contact", url: "" },
];

const ShopLayout = ({ children }) => {
  const pathname = usePathname();
  const { cart } = useContext(CartStateContext);
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <div className="max-h-screen">
      <Box className="backdrop-blur-sm bg-white/30 p-2 scroll-smooth fixed w-screen z-50 top-0 font-mono">
        <Box className="container mx-auto flex justify-between items-center align-middle">
          <Typography variant="h4" fontFamily={"monospace"}>
            G2
          </Typography>
          <div className="flex justify-end items-center align-middle text-xl space-x-5">
            {/* Nav link */}
            {NAV_URL?.map((item, index) => (
              <a
                className={`${pathname === item.url ? "underline" : ""
                  } hover:font-bold`}
                key={index}
                href={item.url}
              >
                {item.label}
              </a>
            ))}

            {/* Cart */}
            <IconButton aria-label="cart" onClick={() => setOpenDrawer(true)}>
              <Badge badgeContent={cart ? cart?.length : "0"} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {/* Avatar */}
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
