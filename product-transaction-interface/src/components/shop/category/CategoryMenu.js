import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

export default function SimpleListMenu({ category, checked, setChecked }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <List
        component="nav"
        aria-label="Device settings"
        sx={{ bgcolor: "background.paper"}}
      >
        <ListItemButton
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label="Category"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClickListItem}
        >
          <ListItemText
            primary="Category"
            secondary={category[checked]?.categoryName || "All"}
          />
        </ListItemButton>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "lock-button",
          role: "listbox",
        }}
      >
        <MenuItem
          selected={undefined === checked}
          onClick={() => setChecked(undefined)}
        >
          All
        </MenuItem>
        {category?.map((item, index) => (
          <MenuItem
            key={item}
            selected={index === checked}
            onClick={() => setChecked(index)}
          >
            {item?.categoryName}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
