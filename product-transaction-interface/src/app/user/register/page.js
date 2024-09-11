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

const RegisterPage = () => {
  //điều hướng đến 1 trang khác dùng userRouter của Navigation ko dùng của next/Router
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleInputUsername = (event) => {
    setUsername(event.target.value);
  };
  const handleInputPassword = (event) => {
    setPassword(event.target.value);
  };
  const handleInputEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const hanldeRegister = async () => {
    try {
      if (username === "") {
        alert("Please enter a username");
      } else if (password === "") {
        alert("Please enter a password");
      } else if (email === "") {
        alert("Please enter a email");
      }

      const registerModel = await registerClient(username, password, email);
      if (registerModel.isRegisterDone) {
        router.push("/user/login");
      }
    } catch (e) {}
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
        <div className="flex flex-col items-center justify-center align-middle gap-6 w-2/5">
          <TextField
            fullWidth
            variant="standard"
            id="outlined-basic"
            type={"text"}
            label="Username"
            onChange={handleInputUsername}
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
            variant="standard"
            id="outlined-basic"
            type={"Email"}
            onChange={handleInputEmail}
            label="Email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AlternateEmailOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />

          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
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
