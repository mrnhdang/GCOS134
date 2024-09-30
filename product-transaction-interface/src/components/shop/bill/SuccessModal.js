import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { useRouter } from "next/navigation";
import { formatNumberWithDots } from "@/util";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
  justifyItems: "start",
  justifyContent: "start",
  alignItems: "center",
  height: "400px",
};

export default function SuccessModal({ open, message, bill }) {
  const router = useRouter();
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex align-middle items-center h-1/2">
            <CheckCircleOutlinedIcon
              className="size-20"
              fontSize="medium"
              color="success"
            />
          </div>
          <div className="flex flex-col align-text-bottom items-center h-1/2 w-full px-4">
            <Typography
              id="modal-modal-title"
              sx={{ fontWeight: "bold", color: "green" }}
              variant="h5"
            >
              {message}
            </Typography>
            <Typography
              id="modal-modal-description"
              className="bg-gray-100 p-2 rounded-lg font-semibold"
              sx={{ mt: 2, width: "100%", p: 2 }}
              letterSpacing={1}
            >
              <div className="flex items-stretch justify-between align-middle w-full">
                <h1>Buyer: </h1>
                <h1>{bill?.username}</h1>
              </div>
              <div className="flex items-stretch justify-between align-middle w-full">
                <h1>Total: </h1>
                <h1>{formatNumberWithDots(bill?.totalPrice)}đ</h1>
              </div>
            </Typography>
          </div>
          <Button
            sx={{ p: 2 }}
            onClick={() => router.push("/product")}
            fullWidth
          >
            Countinue to buy
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
