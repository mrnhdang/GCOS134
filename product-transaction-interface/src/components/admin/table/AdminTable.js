// components/AdminTable.js
import { DataGrid } from "@material-ui/data-grid";
import { FaEdit, FaTrash } from "react-icons/fa";

const AdminTable = ({ data, title }) => {
  // Cấu hình cột của bảng
  const columns = [
    { field: "name", headerName: "Tên sản phẩm", width: 200 },
    { field: "price", headerName: "Giá tiền", width: 150 },
    {
      field: "edit",
      headerName: "Sửa",
      width: 100,
      renderCell: () => <FaEdit />,
    },
    {
      field: "delete",
      headerName: "Xóa",
      width: 100,
      renderCell: () => <FaTrash />,
    },
  ];

  return (
    <div className="flex-1 p-4">
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
    </div>
  );
};

export default AdminTable;
