"use client";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Alert,
  Button,
  CircularProgress,
  Fab,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { formatMilliseconds, formatNumberWithDots } from "@/util";
import CustomStatus from "@/generic/CustomStatus";

const OrderDetailPage = ({ params }) => {
  const { id } = params;
  const [uiState, setUiState] = useState();
  const [orderDetail, setOrderDetail] = useState();
  const [countdown, setCountdown] = useState(30);
  const router = useRouter();

  const handleGetOrderDetail = useCallback(async () => {
    try {
      setUiState({ loading: true });
      setTimeout(async () => {
        const res = await axios.get(`http://localhost:8080/api/v1/order/${id}`);
        setOrderDetail(res?.data);
        setUiState({ loading: false });
      }, 3000);
    } catch (error) {
      const message = error?.response?.data?.message;
      setUiState({
        loading: false,
        error: message,
      });
    }
  }, [orderDetail, id]);

  const handleRemoveOrder = async () => {
    try {
      setUiState({ loading: true });

      const res = await axios.delete(
        `http://localhost:8080/api/v1/order/${id}`
      );

      setUiState({ loading: false });
    } catch (error) {
      const message = error?.response?.data?.message;
      setUiState({
        loading: false,
        error: message,
      });
    }
  };

  const handleCancelOrder = async () => {
    try {
      setUiState({ loading: true });

      const res = await axios.patch(
        `http://localhost:8080/api/v1/order/${id}/cancel`
      );
      handleGetOrderDetail();
      router.push("/shop/user");
      setUiState({ loading: false });
    } catch (error) {
      const message = error?.response?.data?.message;
      setUiState({
        loading: false,
        error: message,
      });
    }
  };

  useEffect(() => {
    handleGetOrderDetail();
  }, []);

  useEffect(() => {
    if (orderDetail?.status !== "DONE" && orderDetail?.status !== "CANCELLED") {
      if (countdown > 0) {
        setTimeout(() => {
          setCountdown(countdown - 1);
        }, 1000);
      } else {
        handleRemoveOrder();
        router.push("/shop");
      }
    }
  }, [countdown]);

  const totalPrice = useMemo(
    () =>
      orderDetail?.products?.reduce((total, item) => {
        return total + item.price * item.holdAmount;
      }, 0),
    [orderDetail]
  );

  return (
    <div className="h-full w-full min-h-screen flex flex-col items-center p-2">
      {orderDetail?.status !== "DONE" &&
        orderDetail?.status !== "CANCELLED" && (
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
        )}
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
      {!uiState?.loading ? (
        <div className="w-3/5 flex flex-col items-center gap-1">
          <div className="flex flex-col justify-center align-middle items-center border border-solid border-white w-full bg-gray-200 rounded-lg p-4 mb-1">
            <h1 className="self-start font-bold text-2xl mb-2">ORDER</h1>
            <div className="p-1 w-full mb-10 flex flex-col space-y-2">
              <div className="flex items-stretch justify-between align-middle">
                <h1 className="font-bold">Order Date: </h1>
                <h1>{`${orderDetail?.purchaseDate[2]}/${orderDetail?.purchaseDate[1]}/${orderDetail?.purchaseDate[0]}`}</h1>
              </div>
              <div className="flex items-stretch justify-between align-middle">
                <h1 className="font-bold">Buyer: </h1>
                <h1>{orderDetail?.user?.username}</h1>
              </div>
              <div className="flex items-stretch justify-between align-middle">
                <h1 className="font-bold">Email: </h1>
                <h1>{orderDetail?.user?.email}</h1>
              </div>
              <div className="flex items-stretch justify-between align-middle">
                <h1 className="font-bold">Status: </h1>
                <CustomStatus status={orderDetail?.status} />
              </div>
            </div>

            <List
              sx={{
                width: "fit-content",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignContent: "center",
                gap: 1,
              }}
            >
              {orderDetail?.products?.map((product, index) => (
                <ListItem
                  className="flex justify-center align-middle items-center space-x-2 w-fit border border-solid border-white bg-white rounded-lg "
                  key={index}
                >
                  <img src={product?.image} className="w-32 h-32" />
                  <ListItemText
                    className="w-[500px]"
                    primary={product?.productName}
                    secondary={product?.price}
                  />
                  <p className="bg-blue-400 w-8 h-8 p-1 rounded-lg text-center align-middle text-white font-bold">
                    {product?.holdAmount}
                  </p>
                </ListItem>
              ))}
              <h1 className="flex flex-col items-end self-end text-blue-500 border border-solid border-white p-2 rounded-lg">
                Total:
                <span className=" text-2xl font-bold">
                  {formatNumberWithDots(totalPrice)}
                </span>
              </h1>
            </List>
          </div>
          {orderDetail?.status !== "DONE" &&
            orderDetail?.status !== "CANCELLED" && (
              <div className="flex w-full space-x-2">
                {" "}
                <Button
                  variant="outlined"
                  color="error"
                  fullWidth
                  onClick={() => {
                    handleRemoveOrder();
                    router?.push(`/shop`);
                  }}
                >
                  Cancel Order
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => {
                    router?.push(`/shop/bill/${orderDetail?.billId}`);
                  }}
                >
                  Procced Paymennt
                </Button>
              </div>
            )}
          {orderDetail?.status === "DONE" && (
            <Button
              variant="outlined"
              color="error"
              fullWidth
              onClick={() => {
                handleCancelOrder();
              }}
            >
              Cancel Shipping Order
            </Button>
          )}
        </div>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};
export default OrderDetailPage;
