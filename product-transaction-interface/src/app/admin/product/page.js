"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { fetchListProduct, deleteProduct } from "../../../client/product_api";
import { Button } from "@mui/material";


const AdminPage = () => {

  const router = useRouter();
  const [selectedFunction, setSelectedFunction] = useState("products");
  const [listProduct, setListProduct] = useState([]);

  useEffect(() => {
    getListProduct();
  }, []);

  const getListProduct = async () => {
    try {
      const listDataProduct = await fetchListProduct();
      setListProduct(listDataProduct);
    } catch (e) {
      alert("Please enter a username");
    }
  };

  const handleDelete = async (id) => {
    try {
      const isDeleteSuccess = await deleteProduct(id);
      if (isDeleteSuccess) {
        alert("Delete is Success");
        getListProduct();
      } else {
        alert("Error Delete ");
      }
      console.log({ isDeleteSuccess });
    } catch (e) {
      alert("Error API ");
    }
  };

  return (
    <Paper className="flex w-full p-4">
      {/* Main Content */}
      <div className="flex-1">
        <div className="flex flex-row items-center">
          <h2 className="text-lg font-bold mb-4">{selectedFunction}</h2>
          <div
            className="ml-4 mb-4 p-2 bg-yellow-400 rounded-lg"
            onClick={() => {
              router.push("/admin/product/add");
            }}
          >
            <FaPlus />
          </div>
        </div>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>COUNT</TableCell>
                <TableCell align="right">ID</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Edit</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listProduct?.map((row, index) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="right">{row.id}</TableCell>
                  <TableCell align="right">{row.productName}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">
                    <Button
                      //   className="rounded-lg p-1 bg-green-600 flex text-center text-white justify-center items-center"
                      onClick={() => {
                        router.push(`/admin/product/${row.id}`);
                      }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      color="error"
                      //   className="rounded-lg p-1 bg-red-500 flex text-center text-white justify-center items-center"
                      onClick={() => {
                        console.log(row.id);
                        handleDelete(row.id);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {/* Test */}
    </Paper>
  );
};

export default AdminPage;
