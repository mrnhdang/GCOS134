"use client";
import { Button, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const AddCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState()
  const handleAddCategories = (e) => {
    console.log(e.target.value);
  }
  return (
    <div className="h-full min-h-screen">
      <h1>Add Category</h1>
      <div>
        <TextField />
        <IconButton onClick={handleAddCategories}>
            <AddOutlinedIcon />
        </IconButton>
      </div>
      <Button>Submit</Button>
    </div>
  );
};
export default AddCategory;
