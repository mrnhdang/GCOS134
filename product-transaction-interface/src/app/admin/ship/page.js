"use client";
import { useEffect, useState } from "react";
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
  CircularProgress,
  Button,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import CustomStatus from "@/generic/CustomStatus";

const ShipListPage = () => {
  const [ships, setShips] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getShips = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/api/v1/ship");
      setShips(response?.data);
    } catch (error) {
      console.error("Error fetching shipments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteShip = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:8080/api/v1/ship/${id}`);
      await getShips();
    } catch (error) {
      console.error("Error fetching shipments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getShips();
  }, []);

  return (
    <Box sx={{ p: 3, height: "100%", minHeight: "100vh" }}>
      <Paper
        elevation={3}
        sx={{ p: 3, mb: 3, backgroundColor: "#f5f5f5", borderRadius: 3 }}
        className="space-y-1"
      >
        {" "}
        <Typography
          variant="h3"
          gutterBottom
          sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}
        >
          Ship Management
        </Typography>
        <Button
          variant="contained"
          onClick={() => router.push("/admin/ship/add")}
        >
          Create
        </Button>
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
                  <TableCell sx={{ fontWeight: "bold" }}>Shipment ID</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Received Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Received Date
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ships ? (
                  ships?.map((ship) => (
                    <TableRow
                      key={ship?.id}
                      sx={{ "&:hover": { backgroundColor: "#f0f0f0" } }}
                    >
                      <TableCell>{ship?.id}</TableCell>
                      <TableCell>
                        <CustomStatus status={ship?.status} />
                      </TableCell>
                      <TableCell>{ship?.user?.username}</TableCell>
                      <TableCell>
                        {ship?.receivedDate
                          ? new Date(ship?.receivedDate).toLocaleDateString()
                          : "Not received"}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => router.push(`/admin/ship/${ship?.id}`)}
                          sx={{ color: "#1976d2" }}
                        >
                          <EditOutlinedIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteShip(ship?.id)}
                          sx={{ color: "#d32f2f" }}
                        >
                          <DeleteOutlinedIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <Typography textAlign="center">No Shipments</Typography>
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

export default ShipListPage;
