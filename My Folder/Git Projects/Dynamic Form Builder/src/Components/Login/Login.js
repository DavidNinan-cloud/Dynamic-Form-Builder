import React, { useState, useRef, useEffect } from "react";
import loginImg from "./Assets/login.png";
import dots from "./Assets/dots.png";
import { Controller, useForm } from "react-hook-form";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import logo from "./Assets/logo.png";
import { useNavigate } from "react-router-dom";


const Login = (props) => {

  const loginSchema = yup
    .object()
    .shape({
      userName: yup.string().required("Username is required"),
      password: yup
        .string()
        .min(4)
        .max(8)
        .required("Please enter valid password"),
    })
    .required();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  let navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  //useState for units, store, subunit
  const [isPassword, setIsPassword] = React.useState(true);
  

  useEffect(() => {
    // console.log(localStorage.getItem("loginStatus"));
    if (localStorage.getItem("loggedUser")) {
      props.setLogin(false);
    } else {
      props.setLogin(true);
      navigate("/", { replace: true });
    }
  }, [props.setLogin]);


  const onSubmit = (data) => {

  };


  return (
    <>
      <div
        style={{
          background: "linear-gradient(90deg,#0B83A5 0%, #FFFFFF 154.06%)",
        }}
        className=" flex items-center justify-center h-full  w-full 2xl:px-10  fixed overflow-hidden"
      >

        <div className="md:mx-44  md:my-72  ">
          <div className="bg-white rounded-xl p-6 overflow-hidden relative">
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <div className="text-[#0B83A5] font-bold flex flex-col items-center py-10  space-x-3">
                {/* <img src={logo} alt="logo" className="h-12" /> */}
                <p className="text-2xl text-[#0B83A5]">
                  Welcome to <span className="text-orange-400">BIYN - INVESTMENTS</span>
                  
                </p>
              </div>
              <div className="space-y-5 ">
                <div className="">
                  <Controller
                    control={control}
                    name="userName"
                    render={({ field }) => (
                      <TextField
                        id="username"
                        fullWidth
                        label="Username"
                        type="text"
                        size="small"
                        {...register("userName")}
                        onClick={() => {
                          setValue("password", "");
                        }}
                        onBlur={(e) => {
                          // if (e.target.value.length > 6) {
                          setIsPassword(false);
                          // }
                        }}
                      />
                    )}
                  />
                  <p className="text-red-500 text-xs">
                    {errors.userName?.message}
                  </p>
                </div>
                <div className="">
                  <Controller
                    control={control}
                    name="password"
                    render={({ field }) => (
                      <TextField
                        disabled={isPassword}
                        fullWidth
                        label="Password"
                        autoComplete="new-password"
                        size="small"
                        type={showPassword ? "text" : "password"}
                        onFocus={() => {
                        }}
                        {...register("password")}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment>
                              <IconButton onClick={handleShowPassword}>
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                  <p className="text-red-500 text-xs">
                    {errors.password?.message}
                  </p>
                </div>
              <div className="mt-1 text-right text-[#0B83A5] ">
                <a href="/" className="hover:text-red-500 lg:text-sm">
                  Forgot Password?
                </a>
              </div>
                <button
                  type="submit"
                  className="bg-[#0B83A5] rounded-lg text-white text-center py-3 w-full my-12 "
                >
                  LogIn
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
