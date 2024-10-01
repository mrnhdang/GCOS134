"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Divider, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import axios from "axios";

export default function CategoryDialog({ setLoading, getCategoryList }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    setCategory([...category, name]);
    setName("");
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`http://localhost:8080/api/v1/category`, {
        categoryNameList: category,
      });
      handleClose();
      getCategoryList();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create
      </Button>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Add Category</DialogTitle>
        <DialogContent className="w-full space-y-2">
          <div className="flex justify-between items-stretch align-middle">
            <h1>Enter category</h1>
            <TextField
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <IconButton onClick={handleAdd}>
              <AddOutlinedIcon />
            </IconButton>
          </div>
          <Divider />
          {category?.length > 0 &&
            category?.map((cate, index) => (
              <div className="w-full">
                {index}. {cate}{" "}
                <IconButton
                  className="self-end"
                  onClick={() =>
                    setCategory(
                      category?.filter((item, itemIndex) => itemIndex !== index)
                    )
                  }
                >
                  <RemoveCircleOutlineOutlinedIcon />
                </IconButton>
              </div>
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
