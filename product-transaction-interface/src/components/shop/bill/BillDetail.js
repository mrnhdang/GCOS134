"use client";
import ProductTable from "@/generic/ProductTable";
import { Button, Divider, Paper, TextField } from "@mui/material";
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
  console.log(bill);

  useEffect(() => {
    handleGetBillDetail();
  }, []);
  return (
    <div className="flex flex-col justify-start align-middle items-center h-screen">
      <div className="w-3/5 flex flex-col items-center gap-1">
        <h1 className="self-start font-bold text-2xl text-gray-500 mb-2">
          Bill
        </h1>
        <Paper sx={{ height: "100%", width: "100%", p: 1 }}>
          {/* User's information */}
          <div className="p-1 m-1 flex flex-col space-y-2">
            <div className="flex items-stretch justify-between align-middle">
              <h1 className="font-bold">Bill ID: </h1>
              <h1>{bill?.id}</h1>
            </div>
            <div className="flex items-stretch justify-between align-middle">
              <h1 className="font-bold">Pay Date: </h1>
              <h1>{bill?.payDate}</h1>
            </div>
            <div className="flex items-stretch justify-between align-middle">
              <h1 className="font-bold">Buyer: </h1>
              <h1>{bill?.user?.username}</h1>
            </div>
            <div className="flex items-stretch justify-between align-middle">
              <h1 className="font-bold">Email: </h1>
              <h1>{bill?.user?.email}</h1>
            </div>
          </div>

          {/* Product */}
          <Divider />
          <div>
            <ProductTable products={bill?.products} />
          </div>
          <Divider />

          {/* Payment */}
          <div className="flex items-stretch justify-between align-middle border border-solid border-white bg-gradient-to-tr from-white to to-slate-300 rounded-lg p-1 m-1">
            <div className="w-full">
              <TextField label="Enter money" variant="outlined" />
            </div>
            <h1 className="flex flex-col items-end text-blue-500">
              Total:
              <span className=" text-2xl font-bold">{bill?.totalPrice}</span>
            </h1>
          </div>
        </Paper>
        <Button fullWidth>Submit</Button>
      </div>
    </div>
  );
};
export default BillDetail;
