import { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  CircularProgress,
  Grid,
} from "@mui/material";

const UserOrder = () => {
  const id = localStorage.getItem("id"); // Get the user ID from the URL

  // State for order data
  const [orders, setOrders] = useState([]);

  // State to manage UI - loading, error
  const [uiState, setUiState] = useState({
    loading: false,
    error: null,
  });

  useEffect(() => {
    const fetchOrders = async () => {
      // Set loading state before starting API call
      setUiState({ loading: true, error: null });

      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/user/${id}/order`
        );
        setOrders(response.data); // Set orders list once API response is successful
        setUiState({ loading: false, error: null }); // Remove loading and error states
      } catch (error) {
        console.error("Error fetching orders:", error);
        setUiState({ loading: false, error: "Error fetching orders." }); // Set error state
      }
    };

    if (id) {
      fetchOrders(); // Fetch data only if user id is available
    }
  }, [id]);

  // Handle loading state
  if (uiState.loading) {
    return (
      <Container style={{ textAlign: "center", marginTop: "2rem" }}>
        <CircularProgress />
        <Typography variant="h6" gutterBottom>
          Loading orders...
        </Typography>
      </Container>
    );
  }

  // Handle error state
  if (uiState.error) {
    return (
      <Container style={{ textAlign: "center", marginTop: "2rem" }}>
        <Typography variant="h6" color="error" gutterBottom>
          {uiState.error}
        </Typography>
      </Container>
    );
  }

  // Render orders data when fetched successfully
  return (
    <Container style={{ marginTop: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Orders for User ID: {id}
      </Typography>
      {orders.length === 0 ? (
        <Typography variant="h6" gutterBottom>
          No orders found.
        </Typography>
      ) : (
        orders.map((order, orderIndex) => (
          <Grid
            container
            spacing={2}
            key={orderIndex}
            style={{ marginBottom: "2rem" }}
          >
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
                Order #{orderIndex + 1}
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    {/* Order ID */}
                    <TableRow>
                      <TableCell>
                        <Typography variant="h6">Order ID</Typography>
                      </TableCell>
                      <TableCell>{order?.id}</TableCell>
                    </TableRow>
                    {/* Purchase Date */}
                    <TableRow>
                      <TableCell>
                        <Typography variant="h6">Purchase Date</Typography>
                      </TableCell>
                      <TableCell>{order?.purchaseDate}</TableCell>
                    </TableRow>
                    {/* Status */}
                    <TableRow>
                      <TableCell>
                        <Typography variant="h6">Order Status</Typography>
                      </TableCell>
                      <TableCell>{order?.status}</TableCell>
                    </TableRow>
                    {/* Bill ID */}
                    <TableRow>
                      <TableCell>
                        <Typography variant="h6">Bill ID</Typography>
                      </TableCell>
                      <TableCell>{order?.billId}</TableCell>
                    </TableRow>
                    {/* User */}
                    <TableRow>
                      <TableCell>
                        <Typography variant="h6">User</Typography>
                      </TableCell>
                      <TableCell>
                        {order?.user?.name} (Email: {order?.user?.email})
                      </TableCell>
                    </TableRow>
                    {/* Products */}
                    <TableRow>
                      <TableCell>
                        <Typography variant="h6">Products</Typography>
                      </TableCell>
                      <TableCell>
                        {order?.products?.map((product, productIndex) => (
                          <div key={productIndex}>
                            <Typography variant="body1">
                              {product?.productName} - {product?.orderAmount}{" "}
                              pcs @ ${product?.price}
                            </Typography>
                          </div>
                        ))}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        ))
      )}
    </Container>
  );
};

export default UserOrder;
