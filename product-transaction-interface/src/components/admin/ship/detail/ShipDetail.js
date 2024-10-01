"use client";
import CustomStatus from "@/generic/CustomStatus";
import ProductTable from "@/generic/ProductTable";
import { formatDateTypeArray } from "@/util";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { useEffect, useState } from "react";

const ShipDetail = ({ id }) => {
  const [ship, setShip] = useState();
  const [uiState, setUiState] = useState({ loading: false });
  const router = useRouter();

  const handleGetShipDetail = async () => {
    try {
      setUiState({ loading: true });
      const res = await axios.get(`http://localhost:8080/api/v1/ship/${id}`);
      setShip(res?.data);
      setUiState({ loading: false });
    } catch (error) {
      const message = error?.response?.data?.message;
      setUiState({
        loading: false,
        error: message,
      });
    }
  };

  const handleConfirmShip = async () => {
    try {
      setUiState({ loading: true });
      const res = await axios.patch(
        `http://localhost:8080/api/v1/ship/${id}/confirm`
      );
      router.push("/admin/ship");
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
    handleGetShipDetail();
  }, []);

  return (
    <div className="h-full min-h-screen p-2 space-y-2">
      {uiState?.error && (
        <Alert color="error" severity="error">
          {uiState?.error}
        </Alert>
      )}
      <h1 className="font-bold text-2xl mb-12">Shipping ID: {ship?.id}</h1>
      {uiState?.loading && <CircularProgress />}

      {/* Shipping Info */}
      <Box mb={4}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <h1>Status:</h1>
          </Grid>
          <Grid item xs={8}>
            <h1>
              {" "}
              <CustomStatus status={bill?.status} />
            </h1>
          </Grid>

          <Grid item xs={4}>
            <h1 variant="h6">Received Date:</h1>
          </Grid>
          <Grid item xs={8}>
            <h1>{formatDateTypeArray(ship?.receivedDate) | "Not received"}</h1>
          </Grid>
          <Grid item xs={4}>
            <h1>Name:</h1>
          </Grid>
          <Grid item xs={8}>
            <h1>{ship?.user?.username}</h1>
          </Grid>

          <Grid item xs={4}>
            <h1>Email:</h1>
          </Grid>
          <Grid item xs={8}>
            <h1>{ship?.user?.email}</h1>
          </Grid>
        </Grid>
      </Box>

      {/* Orders Info */}
      <Box
        component={Paper}
        className="flex flex-col items-center align-middle justify-start rounded-lg"
      >
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          Orders
        </Typography>
        {ship?.orders?.map((order) => {
          return (
            <div className="my-10 flex flex-col justify-center w-1/2">
              <h1>Order: {order?.id}</h1>
              <ProductTable products={order?.products} />
              <Divider />
            </div>
          );
        })}
      </Box>
      <Button
        variant="outlined"
        className="w-full"
        onClick={() => handleConfirmShip()}
      >
        Confirm ship order
      </Button>
    </div>
  );
};
export default ShipDetail;
