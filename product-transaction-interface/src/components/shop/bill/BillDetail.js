"use client";
import ProductTable from "@/generic/ProductTable";
import { CartStateContext } from "@/provider/CartContext";
import { formatMilliseconds } from "@/util";
import {
  Alert,
  Button,
  CircularProgress,
  Divider,
  Fab,
  Paper,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const BillDetail = ({ billId }) => {
  const router = useRouter();
  const { setCart } = useContext(CartStateContext);
  const [bill, setBill] = useState();
  const [uiState, setUiState] = useState();
  const [payment, setPayment] = useState(0);
  const [countdown, setCountdown] = useState(20);

  const handleGetBillDetail = async () => {
    setUiState({ loading: true });
    try {
      const res = await axios.get(
        `http://localhost:8080/api/v1/bill/${billId}`
      );
      setBill(res?.data);
      setUiState({ loading: false });
    } catch (error) {
      const message = error?.response?.data?.message;
      setUiState({
        loading: false,
        error: message,
      });
    }
  };

  const handleRemoveBill = async () => {
    setUiState({ loading: true });
    try {
      await axios.delete(`http://localhost:8080/api/v1/bill/${bill?.id}`);
      setUiState({ loading: false });
    } catch (error) {
      const message = error?.response?.data?.message;
      setUiState({
        loading: false,
        error: message,
      });
    }
  };

  const handleSubmitPayment = async () => {
    setUiState({ loading: true });
    try {
      const payload = {
        userId: localStorage.getItem("id"),
        payPrice: payment,
      };

      await axios.patch(
        `http://localhost:8080/api/v1/bill/payment/${billId}`,
        payload
      );

      setUiState({ loading: false, success: "Transaction successfully!!!" });
      setCart([]);
      router.push("/product/success");
    } catch (error) {
      const message = error?.response?.data?.message;
      setUiState({
        loading: false,
        error: message,
      });
    }
  };

  useEffect(() => {
    if (countdown > 0) {
      setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else {
      handleRemoveBill();
      router.push("/product");
    }
  }, [countdown]);

  useEffect(() => {
    handleGetBillDetail();
  }, []);

  return (
    <div className="flex flex-col justify-start align-middle items-center h-full min-h-screen">
      <Fab
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
        }}
        className="font-bold text-2xl text-center text-white bg-gradient-to-tr from-gray-300 to-gray-400 hover:duration-1000 transition duration-200 ease-in-out hover:scale-105 "
        variant="extended"
      >
        {formatMilliseconds(countdown * 1000)}
      </Fab>
      {uiState?.success && (
        <Alert color="success" severity="success">
          {uiState?.success}
        </Alert>
      )}
      {uiState?.error && (
        <Alert color="error" severity="error">
          {uiState?.error}
        </Alert>
      )}

      <div className="w-3/5 flex flex-col items-center gap-2">
        <Paper
          sx={{ height: "100%", width: "100%", p: 2 }}
          className="bg-gradient-to-tr from-slate-200 to to-slate-300"
        >
          <h1 className="self-start font-bold text-2xl text-black mb-2">
            Bill
          </h1>
          {/* User's information */}
          <div className="p-1 mb-10 flex flex-col space-y-2">
            <div className="flex items-stretch justify-between align-middle">
              <h1 className="font-bold">Bill ID: </h1>
              <h1>{bill?.id}</h1>
            </div>
            <div className="flex items-stretch justify-between align-middle">
              <h1 className="font-bold">Pay Date: </h1>
              <h1>
                {bill?.payDate
                  ? `${bill?.payDate[2]}/${bill?.payDate[1]}/${bill?.payDate[0]}`
                  : "Not paid yet"}
              </h1>
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
          <div className="my-10 flex justify-center">
            {!uiState?.loading ? (
              <ProductTable products={bill?.products} />
            ) : (
              <CircularProgress />
            )}
          </div>
          <Divider />

          {/* Payment */}
          <div className="flex items-stretch justify-between align-middle p-1 my-10">
            <div className="w-full">
              <h1 className="text-gray-400">
                Your balance: {bill?.user?.balance}
              </h1>
              <TextField
                label="Enter money"
                variant="outlined"
                onChange={(e) => setPayment(e.target.value)}
              />
            </div>
            <h1 className="flex flex-col items-end text-blue-500">
              Total:
              <span className="text-2xl font-bold">{bill?.totalPrice}</span>
            </h1>
          </div>
        </Paper>
        <Button
          variant="outlined"
          onClick={() => handleSubmitPayment()}
          fullWidth
        >
          Submit Payment
        </Button>
      </div>
    </div>
  );
};
export default BillDetail;
