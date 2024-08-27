"use client";
import { Badge, Box, IconButton, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import styled from "styled-components";

const NAV_URL = [
  { label: "Home", url: "/product" },
  { label: "About", url: "/product/1" },
  { label: "Contact", url: "" },
];

const ShopLayout = ({ children }) => {
  const pathname = usePathname();

  return (
    <div>
      <Box className="backdrop-blur-sm bg-white/30 p-2 scroll-smooth fixed w-screen z-50 top-0 font-mono">
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

            {/* Cart */}
            <IconButton aria-label="cart">
              <Badge badgeContent={4} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {/* Avatar */}
          </div>
        </Box>
      </Box>
      <div className="w-full p-2 mt-14 h-screen">{children}</div>
    </div>
  );
};
export default ShopLayout;
