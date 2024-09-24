"use client";
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

export default function CategoryList({ category, checked, setChecked }) {
  const handleToggle = (value) => () => {
    setChecked(value);
  };

  return (
    <List
      dense
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper", borderRadius: "12px" }}
    >
      {category?.map((item, index) => {
        const labelId = `checkbox-list-secondary-label-${index}`;
        return (
          <ListItem
            key={index}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={handleToggle(index)}
                checked={checked === index}
                inputProps={{ "aria-labelledby": labelId }}
              />
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemText id={labelId} primary={item?.categoryName} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
