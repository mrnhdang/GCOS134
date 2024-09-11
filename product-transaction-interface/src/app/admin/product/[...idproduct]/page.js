"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";

export default function ProductForm({ params }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const router = useRouter();
  const idParam = params.idproduct;
  const [productDetail, setProductDetail] = useState({});

  // useEffect(() => {
  //   getProductDetail();
  // }, []);

  // const getProductDetail = async () => {
  //   try {
  //     const productDetail = await fetchDetailProduct(idParam);
  //     setProductDetail(productDetail);
  //     setName(productDetail.productName);
  //     setPrice(productDetail.price);
  //     console.log({ productDetail });
  //   } catch (e) {
  //     alert("Please enter a username");
  //   }
  // };

  const handleEdit = async () => {
    try {
      const isEditProduct = await editProduct(idParam, name, price);
      if (isEditProduct) {
        alert("Edit is Success");
        router.push("/admin/product");
      } else {
        alert("Error Edit ");
      }
    } catch (e) {
      alert("Error API ");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEdit();
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Box
        component="form"
        onSubmit={handleSubmit}
        className="flex flex-col items-center p-8 bg-white shadow-md rounded-lg"
      >
        <Typography variant="h5" className="mb-6">
          Edit product
        </Typography>

        <TextField
          label="Name product"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4 w-full"
        />

        <TextField
          label="Price"
          variant="outlined"
          value={price}
          type="number"
          onChange={(e) => setPrice(e.target.value)}
          className="mb-4 w-full"
        />

        <label htmlFor="image-upload" className="mb-4 w-full cursor-pointer">
          <div className="flex items-center justify-center px-4 py-2 border-2 border-gray-300 border-dashed rounded-md">
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Product"
                className="max-w-full max-h-32 object-contain"
              />
            ) : (
              <Typography variant="body2" color="textSecondary">
                Upload file
              </Typography>
            )}
          </div>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="w-full"
          onClick={() => {
            handleEdit();
          }}
        >
          Save
        </Button>
      </Box>
    </div>
  );
}
