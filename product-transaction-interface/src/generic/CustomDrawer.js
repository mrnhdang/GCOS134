"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Typography } from "@mui/material";

export default function CustomDrawer({ cart, openDrawer, setOpenDrawer }) {
  return (
    <div>
      <Drawer
        anchor={"right"}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Box
          role="presentation"
          onClick={() => setOpenDrawer(false)}
          onKeyDown={() => setOpenDrawer(false)}
        >
          <List>
            {cart?.map((product, index) => (
              <ListItem key={index} disablePadding>
                <Typography>{product?.productName}</Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
}
