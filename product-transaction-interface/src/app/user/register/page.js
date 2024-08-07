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
import { registerClient } from "../../../client/client_api";

const LoginPage = () => {
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
      <div className="flex flex-col justify-center p-3 bg-white rounded-xl shadow-NotificationItems w-1/4 h-3/5 ">
        <div className="flex flex-col items-center text-black font-semibold text-[30px]">
          REGISTER
        </div>
        <div className="flex flex-col items-center text-black text-[13px] mb-8">
          Enter your infomation for account
        </div>
        <div className="flex flex-col items-center">
          <FormControl
            sx={{
              m: 1,
              width: {
                xs: "100%",
                sm: "25ch",
                md: "30ch",
                lg: "35ch",
              },
            }}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Username
            </InputLabel>
            <OutlinedInput
              id="outlined-basic"
              type={"text"}
              label="Username"
              onChange={handleInputUsername}
              className={`
                                w-full
                                sm:w-[25ch]
                                md:w-[30ch]
                                lg:w-[35ch]
                              `}
            />
          </FormControl>
          <FormControl
            sx={{
              m: 1,
              width: {
                xs: "100%",
                sm: "25ch",
                md: "30ch",
                lg: "35ch",
              },
            }}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-basic"
              type={showPassword ? "text" : "password"}
              onChange={handleInputPassword}
              className={`
                                w-full
                                sm:w-[25ch]
                                md:w-[30ch]
                                lg:w-[35ch]
                              `}
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
          <FormControl
            sx={{
              m: 1,
              width: {
                xs: "100%",
                sm: "25ch",
                md: "30ch",
                lg: "35ch",
              },
            }}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
            <OutlinedInput
              id="outlined-basic"
              type={"Email"}
              onChange={handleInputEmail}
              className={`
                                w-full
                                sm:w-[25ch]
                                md:w-[30ch]
                                lg:w-[35ch]
                              `}
              label="Email"
            />
          </FormControl>
          <Button
            className="mt-4 ml-2 w-[250px]"
            variant="contained"
            onClick={() => {
              hanldeRegister();
            }}
          >
            Register
          </Button>
        </div>
      </div>
      <div></div>
    </div>
  );
};
export default LoginPage;
