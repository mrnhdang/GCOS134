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
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";

const ShipListPage = () => {
  const [ships, setShips] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getShips();
  }, []);

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

  return (
    <Box sx={{ p: 3, height: "100%", minHeight: "100vh" }}>
      <Paper
        elevation={3}
        sx={{ p: 3, mb: 3, backgroundColor: "#f5f5f5", borderRadius: 3 }}
      >
        {" "}
        <Typography
          variant="h3"
          gutterBottom
          sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}
        >
          Ship Management
        </Typography>
        <Button onClick={() => router.push("/admin/ship/add")}>
          Create shipment
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
                      <TableCell>{ship?.status}</TableCell>
                      <TableCell>{ship?.user?.username}</TableCell>
                      <TableCell>
                        {ship?.receivedDate
                          ? new Date(ship?.receivedDate).toLocaleDateString()
                          : "UNPAID"}
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
