"use client";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { useContext, useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { AuthStateContext } from "@/provider/AuthContext";

const UserDetail = () => {
  const { auth, handleGetUserDetail, uiState } = useContext(AuthStateContext);
  const [userDetail, setUserDetail] = useState(null);

  useEffect(() => {
    getUserDetail();
  }, []);

  const getUserDetail = async () => {
    try {
      await handleGetUserDetail(auth?.id);
      setUserDetail(uiState?.userDetail);
    } catch (error) {
      console.error("Error fetching user detail:", error);
    }
  };

  return (
    <div className="h-full min-h-screen">
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div className="font-bold">User Detail</div>
        </AccordionSummary>
        {uiState?.loading ? (
          <CircularProgress />
        ) : (
          <AccordionDetails>
            {userDetail ? (
              <div>
                <p>
                  <strong>Name: </strong>
                  {userDetail?.name}
                </p>
                <p>
                  <strong>Email: </strong>
                  {userDetail?.email}
                </p>
                <p>
                  <strong>Phone: </strong>
                  {userDetail?.phone}
                </p>
                {/* Thêm các thông tin chi tiết khác của người dùng */}
              </div>
            ) : (
              <p>No User Detail available.</p>
            )}
          </AccordionDetails>
        )}

        <AccordionActions>
          <Button onClick={() => getUserDetail()}>Refresh Details</Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
};

export default UserDetail;
