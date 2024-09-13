"use client";
import { Button, List, ListItem, ListItemText, Paper } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const BillDetail = () => {
  const [bill, setBill] = useState();

  const handleGetBillDetail = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/bill/66dd0a22bab5e49522968cbe"
      );
      console.log(res?.data);
      setBill(res?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetBillDetail();
  }, []);
  return (
    <div className="flex flex-col justify-start align-middle items-center h-screen">
      <div className="w-3/5 flex flex-col items-center gap-1">
        <h1 className="self-start font-bold text-2xl text-gray-500 mb-2">
          Bill
        </h1>
        <Paper sx={{ height: "100%", width: "100%" }}>
          <h1>{bill?.id}</h1>
          <h1>{bill?.payDate}</h1>
          <h1>Order</h1>
          <h1>Purchase date: {bill?.order?.purchaseDate}</h1>
          {bill?.order?.products?.map((product) => {
            return (
              <List>
                <ListItem secondaryAction={<h1>{product?.productName}</h1>}>
                  Product:
                </ListItem>
                <ListItem secondaryAction={<h1>{product?.price}</h1>}>
                  Product price:
                </ListItem>
              </List>
            );
          })}
          <div className="flex items-stretch justify-between align-middle">
            <h1>Total Price:</h1>
            <h1>{bill?.totalPrice}</h1>
          </div>
        </Paper>
        <Button>Pay</Button>
      </div>
    </div>
  );
};
export default BillDetail;
