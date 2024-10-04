"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import CustomStatus from "@/generic/CustomStatus";

const OrderPage = () => {
  const router = useRouter();
  const [listOrder, setListOrder] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getListOrder();
  }, []);

  const getListOrder = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8080/api/v1/order");
      setListOrder(res?.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/order/${id}`);
      setListOrder(listOrder.filter((order) => order?.id !== id));
      alert("Order deleted successfully");
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Failed to delete order");
    }
  };

  return (
    <Box sx={{ p: 3 }} className="h-full min-h-screen">
      <Paper
        elevation={3}
        sx={{ p: 3, mb: 3, backgroundColor: "#f5f5f5", borderRadius: 3 }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}
        >
          Order Management
        </Typography>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer
            component={Paper}
            sx={{ boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)" }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#e0f7fa" }}>
                  <TableCell sx={{ fontWeight: "bold" }}>Order ID</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Purchase Date
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>User Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Bill ID</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listOrder ? (
                  listOrder?.map((order) => (
                    <TableRow
                      key={order?.id}
                      sx={{ "&:hover": { backgroundColor: "#f0f0f0" } }}
                    >
                      <TableCell>{order?.id}</TableCell>
                      <TableCell>
                        {order?.purchaseDate
                          ? new Date(order?.purchaseDate).toLocaleDateString()
                          : "UNPAID"}
                      </TableCell>
                      <TableCell>
                        <CustomStatus status={order?.status} />
                      </TableCell>
                      <TableCell>{order?.user?.username}</TableCell>
                      <TableCell>{order?.billId}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() =>
                            router.push(`/admin/order/${order?.id}`)
                          }
                          sx={{ color: "#1976d2" }}
                        >
                          <EditOutlinedIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => deleteOrder(order?.id)}
                          sx={{ color: "#d32f2f" }}
                        >
                          <DeleteOutlinedIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <Typography textAlign="center">
                        No Orders Found
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
};

export default OrderPage;
