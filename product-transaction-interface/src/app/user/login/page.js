"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  OutlinedInput,
  InputAdornment,
  IconButton,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const LoginPage = () => {
  //điều hướng đến 1 trang khác dùng userRouter của Navigation ko dùng của next/Router
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleInputUsername = (event) => {
    setUsername(event.target.value);
  };
  const handleInputPassword = (event) => {
    setPassword(event.target.value);
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //login oke
  const handleLogin = async () => {
    try {
      if (username === "") {
        alert("Please enter a username");
      } else if (password === "") {
        alert("Please enter a password");
      }

      const userLoginModel = await loginClient(username, password);
      if (userLoginModel.loginIsDone) {
        // router.push('/regsiter')
      }
    } catch (e) {}
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-whiteGray relative ">
      <div className="flex flex-col justify-center p-3 bg-white rounded-xl shadow-NotificationItems w-1/4 h-3/5 ">
        <div className="flex flex-col items-center text-black font-mono font-semibold text-[30px]">
          LOGIN
        </div>
        <div className="flex flex-col items-center text-black text-[13px] mb-8">
          Enter your account detail to login
        </div>
        <div className="flex flex-col items-center">
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Username
            </InputLabel>
            <OutlinedInput
              id="outlined-basic"
              type={"text"}
              label="Username"
              onChange={handleInputUsername}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-basic"
              type={showPassword ? "text" : "password"}
              onChange={handleInputPassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <div className="text-[10px] mt-2">Forgot password ?</div>
          <Button
            className="mt-4 ml-2 w-[250px]"
            variant="contained"
            onClick={() => {
              handleLogin();
            }}
          >
            Login
          </Button>
        </div>

        <div className="flex flex-col items-center text-black text-[10px] mt-8">
          <div className="flex flex-row">
            <div> Don&apos;t have account? </div>
            <div
              className="font-bold ml-1"
              onClick={() => router.push("/user/register")}
            >
              Register now
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
