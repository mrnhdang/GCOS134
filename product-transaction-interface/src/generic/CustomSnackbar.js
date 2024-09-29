import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert, Slide } from "@mui/material";

export default function CustomSnackbar({ openSnackbar, setOpenSnackbar }) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={openSnackbar}
        autoHideDuration={900}
        onClose={handleClose}
        TransitionComponent={Slide}
      >
        <Alert severity="success" variant="filled">
          Add to cart successfully
        </Alert>
      </Snackbar>
    </div>
  );
}
