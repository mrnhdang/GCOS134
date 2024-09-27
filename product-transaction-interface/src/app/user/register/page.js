"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  InputAdornment,
  IconButton,
  InputLabel,
  FormControl,
  Button,
  TextField,
  Input,
} from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import KeyOffRoundedIcon from "@mui/icons-material/KeyOffRounded";
import axios from "axios";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SmartphoneOutlinedIcon from "@mui/icons-material/SmartphoneOutlined";

const RegisterPage = () => {
  //điều hướng đến 1 trang khác dùng userRouter của Navigation ko dùng của next/Router
  const router = useRouter();
  const [registerUser, setRegisterUser] = useState({
    username: "",
    email: "",
    address: "",
    phoneNumber: "",
    password: "",
  });
  const [uiState, setUiState] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    setRegisterUser({
      ...registerUser,
      [e.target.name]: e.target.value,
    });
  };

  const hanldeRegister = async () => {
    try {
      setUiState({ loading: true });
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/register",
        registerUser
      );
      if (res?.data) {
        router.push("/user/login");
      }
      setUiState({ loading: false });
    } catch (error) {
      const message = error?.response?.data?.message;
      setUiState({
        loading: false,
        error: message,
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-whiteGray relative">
      <div className="flex flex-col justify-center items-center p-3 bg-white rounded-xl shadow-NotificationItems w-1/2 h-3/5 ">
        <div className="flex flex-col items-center text-black font-mono font-semibold text-[30px]">
          REGISTER
        </div>
        <div className="flex flex-col items-center text-black text-[13px] mb-8">
          Enter your infomation for account
        </div>
        {uiState?.success && (
          <Alert color="success" severity="success">
            {uiState?.success}
          </Alert>
        )}
        {uiState?.error && (
          <Alert color="error" severity="error">
            {uiState?.error}
          </Alert>
        )}

        <div className="flex flex-col items-center justify-center align-middle gap-6 w-2/5">
          <TextField
            fullWidth
            name="username"
            variant="standard"
            id="outlined-basic"
            type={"text"}
            label="Username"
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            name="email"
            variant="standard"
            id="outlined-basic"
            type={"Email"}
            onChange={handleChange}
            label="Email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AlternateEmailOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            name="address"
            variant="standard"
            id="outlined-basic"
            type={"text"}
            label="Address"
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HomeOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            name="phonnumber"
            variant="standard"
            id="outlined-basic"
            type={"text"}
            label="Phone Number"
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SmartphoneOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />

          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              name="password"
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              startAdornment={
                <InputAdornment>
                  <IconButton
                    size="small"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <KeyOffRoundedIcon /> : <KeyRoundedIcon />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <Button
            className="mt-4 ml-2 w-[250px]"
            variant="outlined"
            onClick={() => {
              hanldeRegister();
            }}
          >
            Register
          </Button>
        </div>

        <div className="flex flex-col items-center text-black text-[10px] mt-8">
          <div className="flex flex-row">
            <div> Already have account? </div>
            <div
              className="font-bold ml-1"
              onClick={() => router.push("/user/login")}
            >
              Login now
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;
