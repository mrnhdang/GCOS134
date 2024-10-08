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
  IconButton,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import axios from "axios";

const InventoryPage = () => {
  const [inventoryList, setInventoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState();
  const [error, setError] = useState();
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    getInventoryList();
  }, []);

  const getInventoryList = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8080/api/v1/inventory");
      setInventoryList(res?.data);
    } catch (e) {
      console.error("Error fetching inventory:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleEditQuantity = async () => {
    try {
      setLoading(true);
      const res = await axios.patch(
        `http://localhost:8080/api/v1/inventory/${isEdit?.id}`,
        { currentAmount: quantity }
      );
      console.log("Updated quantity:", res.data);
      getInventoryList();
    } catch (e) {
      console.error("Error updating inventory:", e);
      setError(e?.response?.data?.message);
    } finally {
      setIsEdit(undefined);
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, width: "100%" }} className="h-full min-h-screen">
      <Paper
        elevation={3}
        sx={{ p: 3, mb: 3, backgroundColor: "#f5f5f5", borderRadius: 3 }}
        className="p-4 space-y-2 w-full flex flex-col"
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}
        >
          Inventory Management
        </Typography>
        {error && (
          <Alert color="error" severity="error">
            {error}
          </Alert>
        )}
        {isEdit && (
          <div className="flex flex-row-reverse w-full">
            <Button
              variant="contained"
              className="ml-2 w-32"
              onClick={handleEditQuantity}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              className="w-32"
              onClick={() => setIsEdit(undefined)}
            >
              Cancel
            </Button>
          </div>
        )}
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
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Inventory ID
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Product Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Quantity</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {inventoryList ? (
                  inventoryList?.map((inventory) => (
                    <TableRow
                      key={inventory?._id}
                      sx={{ "&:hover": { backgroundColor: "#f0f0f0" } }}
                    >
                      <TableCell>{inventory?.id}</TableCell>
                      <TableCell>{inventory?.product?.productName}</TableCell>
                      <TableCell>
                        {isEdit?.id === inventory?.id ? (
                          <TextField
                            InputProps={{ inputProps: { min: 0, max: 10 } }}
                            type="number"
                            defaultValue={inventory?.currentQuantity}
                            onChange={(e) => setQuantity(e.target.value)}
                          />
                        ) : (
                          <>{inventory?.currentQuantity}</>
                        )}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          sx={{ color: "#1976d2" }}
                          onClick={() => setIsEdit({ id: inventory?.id })}
                        >
                          <EditOutlinedIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Typography textAlign="center">
                        No Inventory Items Found
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

export default InventoryPage;
