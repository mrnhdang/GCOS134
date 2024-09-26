"use client";
import {
  Badge,
  Box,
  Button,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CustomDrawer from "@/generic/CustomDrawer";
import { useContext, useState } from "react";
import { CartStateContext } from "@/provider/CartContext";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { AuthStateContext } from "@/provider/AuthContext";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";

const NAV_URL = [
  { label: "Home", url: "/product" },
  { label: "About", url: "/product/1" },
  { label: "Contact", url: "" },
];

const ShopLayout = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { cart } = useContext(CartStateContext);
  const { auth } = useContext(AuthStateContext);
  const { logout } = useContext(AuthStateContext);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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

            {/* Cart */}
            <IconButton aria-label="cart" onClick={() => setOpenDrawer(true)}>
              <Badge badgeContent={cart ? cart?.length : "0"} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {/* Avatar */}
            {auth ? (
              <>
                <IconButton
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <AccountCircleOutlinedIcon />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={() => router.push("/product/user")}>
                    <ListItemIcon>
                      <PersonOutlineOutlinedIcon />
                    </ListItemIcon>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={() => logout()}>
                    <ListItemIcon>
                      <ExitToAppOutlinedIcon />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button onClick={() => router.push("/user/login")}>
                  LOGIN
                </Button>
                <Button onClick={() => router.push("/user/register")}>
                  REGISTER
                </Button>
              </>
            )}
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
