"use client";
import { useEffect, useState } from "react";
import {
  List,
  ListItem,
  IconButton,
  ListItemButton,
  ListItemIcon,
  Checkbox,
  ListItemText,
  Alert,
  CircularProgress,
  Button,
  Typography,
} from "@mui/material";

import axios from "axios";
import { formatDateTypeArray } from "@/util";

const ShipForm = () => {
  const [orderList, setOrderList] = useState([]);
  const [checked, setChecked] = useState([]);
  const [uiState, setUiState] = useState();

  const userId = localStorage.getItem("id");

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  console.log(checked);

  // Handle form submission
  const handleCreateShip = async (e) => {
    setUiState({ loading: true });

    const requestBody = {
      userId,
      orders: checked,
    };
    console.log(requestBody);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/ship",
        requestBody
      );

      setUiState({ loading: false, success: "Create Ship successfully" });
    } catch (error) {
      const message = error?.response?.data?.message;
      setUiState({
        loading: false,
        error: message,
      });
    } finally {
      setUiState({ loading: false });
    }
  };

  const getListOrder = async () => {
    try {
      setUiState({ loading: true });
      const res = await axios.get("http://localhost:8080/api/v1/order");
      setOrderList(res?.data);
    } catch (e) {
      const message = error?.response?.data?.message;
      setUiState({
        loading: false,
        error: message,
      });
    } finally {
      setUiState({ loading: false });
    }
  };

  useEffect(() => {
    getListOrder();
  }, []);

  return (
    <div className="h-full min-h-screen p-2 flex flex-col items-center justify-start space-y-1">
      <Typography
        variant="h3"
        gutterBottom
        sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}
      >
        Create Shipping for Order
      </Typography>
      {uiState?.success && (
        <SuccessModal
          open={openModal}
          setOpen={setOpenModal}
          message={uiState?.success}
          bill={bill}
        />
      )}
      {uiState?.error && (
        <Alert color="error" severity="error">
          {uiState?.error}
        </Alert>
      )}
      {!uiState?.loading ? (
        <List
          sx={{
            width: "80%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: "12px",
            bgcolor: "background.paper",
          }}
          className="space-y-2"
        >
          <h1 className="font-bold text-xl">Select Orders:</h1>
          <div className="border border-solid rounded-lg max-h-[500px] overflow-scroll p-1">
            {orderList?.map((order, index) => {
              const labelId = `checkbox-list-label-${index}`;

              return (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    role={undefined}
                    onClick={handleToggle(order?.id)}
                    dense
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checked?.includes(order?.id)}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{
                        display: "flex",
                        justifyItems: "center",
                        justifyContent: "center",
                      }}
                      id={labelId}
                      primary={`${order?.id}-${formatDateTypeArray(order?.purchaseDate)}-${order?.user?.username}`}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </div>
          <Button fullWidth onClick={() => handleCreateShip()}>
            Create Ship Order
          </Button>
        </List>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default ShipForm;
