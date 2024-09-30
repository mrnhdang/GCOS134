"use client";
import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  List,
  ListItem,
  IconButton,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const ShipForm = () => {
  const [orderId, setOrderId] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("id");

  // Add order ID to the list
  const addOrderId = () => {
    if (orderId.trim() !== "") {
      setOrders([...orders, orderId]);
      setOrderId(""); // Clear input after adding
    }
  };

  // Remove order from the list
  const removeOrderId = (index) => {
    setOrders(orders.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const requestBody = {
      userId,
      orders,
    };

    try {
      //   const response = await axios.post('http://localhost:8080/api/v1/ship', requestBody);
      console.log("Shipping details added successfully:", response.data);
      // Redirect or show success message
    } catch (error) {
      console.error("Error adding shipping details:", error);
      setError("Failed to add the shipping details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full min-h-screen">
      <h1>New Ship</h1>
      <form className=" bg-white p-10" onSubmit={handleSubmit}>
        {/* Order ID input */}
        <Box display="flex" alignItems="center" mt={2}>
          <TextField
            label="Enter orders"
            variant="outlined"
            fullWidth
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
          <IconButton onClick={addOrderId} color="primary">
            <AddCircleIcon />
          </IconButton>
        </Box>

        {/* List of added orders */}
        <List>
          {orders.map((order, index) => (
            <ListItem key={index}>
              <Box display="flex" justifyContent="space-between" width="100%">
                {order}
                <IconButton
                  onClick={() => removeOrderId(index)}
                  color="secondary"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>

        {/* Submit button */}
        <Button
          type="submit"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading || !userId || orders.length === 0}
        >
          {loading ? "Submitting..." : "Add Shipping Details"}
        </Button>

        {/* Error Message */}
        {error && (
          <Typography color="error" variant="body2" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </form>
    </div>
  );
};

export default ShipForm;
