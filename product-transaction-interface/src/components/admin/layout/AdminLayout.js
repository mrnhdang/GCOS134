"use client";
import React, { useContext } from "react";
import {
  Box,
  CssBaseline,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  IconButton,
} from "@mui/material";
import { useRouter } from "next/navigation";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptIcon from "@mui/icons-material/Receipt";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Link from "next/link";
import { AuthStateContext } from "@/provider/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
const drawerWidth = 240;

const AdminLayout = ({ children }) => {
  const { auth, logout } = useContext(AuthStateContext);
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Drawer
        sx={{
          width: drawerWidth,
          display: "flex",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Typography
          className="p-2 font-bold"
          variant="h4"
          fontFamily={"monospace"}
        >
          G2 ADMIN
        </Typography>
        <List sx={{ height: "100%" }}>
          <ListItem button component={Link} href="/admin">
            <DashboardIcon sx={{ mr: 2 }} />
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} href="/admin/order">
            <ListAltIcon sx={{ mr: 2 }} />
            <ListItemText primary="Order" />
          </ListItem>
          <ListItem button component={Link} href="/admin/bill">
            <ReceiptIcon sx={{ mr: 2 }} />
            <ListItemText primary="Bill" />
          </ListItem>
          <ListItem button component={Link} href="/admin/user">
            <PeopleIcon sx={{ mr: 2 }} />
            <ListItemText primary="User" />
          </ListItem>
          <ListItem button component={Link} href="/admin/inventory">
            <InventoryIcon sx={{ mr: 2 }} />
            <ListItemText primary="Inventory" />
          </ListItem>
          <ListItem button component={Link} href="/admin/category">
            <CategoryIcon sx={{ mr: 2 }} />
            <ListItemText primary="Category" />
          </ListItem>
          <ListItem button component={Link} href="/admin/ship">
            <LocalShippingIcon sx={{ mr: 2 }} />
            <ListItemText primary="Ship" />
          </ListItem>
        </List>

        {auth ? (
          <div className="flex">
            <div className="w-full">
              <IconButton>
                <AccountCircleOutlinedIcon />
              </IconButton>
              <>{auth?.username}</>
            </div>

            <IconButton onClick={logout} className="self-end">
              <LogoutIcon />
            </IconButton>
          </div>
        ) : (
          <></>
        )}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${drawerWidth}px)`,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
