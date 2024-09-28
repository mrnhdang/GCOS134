import React from "react";
import {
  Container,
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useRouter } from "next/navigation";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptIcon from "@mui/icons-material/Receipt";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Link from "next/link";

const drawerWidth = 240;

const AdminLayout = ({ children }) => {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <button
            onClick={handleLogout}
            style={{
              background: "none",
              border: "none",
              color: "white",
              cursor: "pointer",
            }}
          >
            <ExitToAppIcon />
          </button>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
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
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${drawerWidth}px)`,
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
