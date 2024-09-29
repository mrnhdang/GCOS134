"use client";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import Profile from "./profile/Profile";
import { useContext } from "react";
import { AuthStateContext } from "@/provider/AuthContext";
import { CircularProgress } from "@mui/material";
import UserOrder from "./order/UserOrder";

const UserProfile = () => {
  const {
    auth,
    handleOnChangeAuth,
    handleEditUserDetail,
    handleGetUserDetail,
    uiState,
  } = useContext(AuthStateContext);
  return (
    <div className="h-full min-h-screen">
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div className="font-bold">Profile</div>
        </AccordionSummary>
        {uiState?.loading ? (
          <CircularProgress />
        ) : (
          <AccordionDetails>
            <Profile auth={auth} handleOnChangeAuth={handleOnChangeAuth} />
          </AccordionDetails>
        )}

        <AccordionActions>
          <Button onClick={() => handleGetUserDetail(auth?.id)}>
            Discard changes
          </Button>
          <Button onClick={() => handleEditUserDetail()}>Save</Button>
        </AccordionActions>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <div className="font-bold">Your Order</div>
        </AccordionSummary>
        <AccordionDetails>
          <UserOrder />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
export default UserProfile;
