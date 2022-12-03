import React, { useState, useRef, useEffect } from "react";
import loginImg from "../Assets/login.png";
import dots from "../Assets/dots.png";
import { Controller, useForm } from "react-hook-form";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../authentication/slices/auth";
import { clearMessage } from "../../authentication/slices/message";
import logo from "../../OPD/assets/Images/logo.png";
import { useNavigate } from "react-router-dom";
import { errorAlert } from "../../Common Components/Toasts/CustomToasts";

const Login = (props) => {
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);

  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

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
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  let navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const [num1, setNum1] = useState("");

  const num1Ref = useRef(null);
  useEffect(() => {
    dispatch(clearMessage());
    num1Ref.current && num1Ref.current.focus();
  }, [dispatch]);

  useEffect(() => {
    if (num1.length === 1) {
      num2Ref.current.focus();
    }
  }, [num1.length]);

  const onChangeNum1 = (e) => {
    setNum1(e.target.value);
  };

  const [num2, setNum2] = useState("");
  const num2Ref = useRef(null);
  useEffect(() => {
    if (num2.length === 1) {
      num3Ref.current.focus();
    }
  }, [num2.length]);

  const onChangeNum2 = (e) => {
    setNum2(e.target.value);
  };

  const [num3, setNum3] = useState("");
  const num3Ref = useRef(null);
  useEffect(() => {
    if (num3.length === 1) {
      num4Ref.current.focus();
    }
  }, [num3.length]);

  const onChangeNum3 = (e) => {
    setNum3(e.target.value);
  };

  const [num4, setNum4] = useState("");
  const num4Ref = useRef(null);
  useEffect(() => {
    if (num4.length === 1) {
      num5Ref.current.focus();
    }
  }, [num4.length]);

  const onChangeNum4 = (e) => {
    setNum4(e.target.value);
  };

  const [num5, setNum5] = useState("");
  const num5Ref = useRef(null);
  useEffect(() => {
    if (num5.length === 1) {
      num6Ref.current.focus();
    }
  }, [num5.length]);

  const onChangeNum5 = (e) => {
    setNum5(e.target.value);
  };

  const [num6, setNum6] = useState("");
  const num6Ref = useRef(null);
  useEffect(() => {
    if (num6.length === 1) {
      num7Ref.current.focus();
    }
  }, [num6.length]);

  const onChangeNum6 = (e) => {
    setNum6(e.target.value);
  };

  const [num7, setNum7] = useState("");
  const num7Ref = useRef(null);
  useEffect(() => {
    if (num7.length === 1) {
      num8Ref.current.focus();
    }
  }, [num7.length]);

  const onChangeNum7 = (e) => {
    setNum7(e.target.value);
  };

  const [num8, setNum8] = useState("");
  const num8Ref = useRef(null);

  const onChangeNum8 = (e) => {
    setNum8(e.target.value);
  };

  //API For Login
  // const { isLoading, isError, error, mutate, isSuccess } = useMutation(
  //   loginservice,
  //   {
  //     onSuccess: (response) => {
  //       console.log(response.data.result.token);
  //       localStorage.setItem("loginToken", response.data.result.token);
  //       localStorage.setItem("loginStatus", true);
  //       props.setLogin(false);
  //     },
  //   },
  //   {
  //     onError: (err) => {
  //       console.log("Failed to Login");
  //       props.setLogin(true);
  //     },
  //   }
  // );

  useEffect(() => {
    // console.log(localStorage.getItem("loginStatus"));
    if (localStorage.getItem("loggedUser")) {
      props.setLogin(false);
    } else {
      props.setLogin(true);
      navigate("/", { replace: true });
    }
  }, [props.setLogin]);

  let loginDetails;
  // const getLoginStatus = () => {
  //   loginDetails = localStorage.getItem("loginStatus");
  //   console.log(loginDetails);
  //   if (loginDetails === "true") {
  //     props.setLogin(false);
  //   } else {
  //     props.setLogin(true);
  //   }
  // };

  const onSubmit = (data) => {
    console.log(data);
    let loginData = {
      username: data.userName,
      password: data.password,
    };

    setLoading(true);
    dispatch(login(loginData))
      .unwrap()
      .then((res) => {
        props.setLogin(false);
        props.getDrawerMenu();
        localStorage.setItem("username", res.user.username);
        localStorage.setItem("role", res.user.role);
        //window.location.reload()
      })
      .catch((res) => {
        setLoading(false);
        errorAlert("Invalid Username or Password");
      });
    // mutate(loginData);

    // if (data.userName !== "" && data.password !== "") {
    //   localStorage.setItem("loginStatus", true);
    //   getLoginStatus()
    // } else {
    //   localStorage.setItem("loginStatus", false);
    //   getLoginStatus()
    // }
    reset();
  };

  // if(isLoggedIn){
  //     return <Redirect to="/"/>
  // }

  return (
    <>
      <div
        style={{
          background: "linear-gradient(90deg,#0B83A5 0%, #FFFFFF 154.06%)",
        }}
        className=" flex items-center justify-center lg:justify-between lg:py-[3.6rem] xl:py-[3rem] 2xl:py-[9rem] xl:px-10 h-full  w-full 2xl:px-10  fixed overflow-hidden"
      >
        <div className="grid w-full items-center justify-center">
          <div className="hidden lg:block lg:w-full lg:px-6 ">
            {/* <p className="text-white text-lg italic	">DocItHealth</p> */}
            <img src={loginImg} alt="" className="xl:w-10/12  2xl:w-10/12" />
            <div className="text-slate-200">
              <p className=" xl:text-xl ml-16 xl:ml-20 2xl:ml-24 font-semibold">
                <span className="text-sm xl:text-base font-normal">
                  {" "}
                  Designed And Developed By&nbsp;
                </span>
                AppyStack Pvt.&nbsp;Ltd.
              </p>
              <p className="text-sm ml-16 xl:ml-20 2xl:ml-24">
                Ⓒ Copyright All Rights Reserved
              </p>
            </div>
          </div>
        </div>
        <div className="md:mx-44  md:my-72  lg:my-0 lg:mx-20 2xl:mx-20">
          <div className="hidden lg:block lg:w-56 2xl:w-full">
            <img
              src={dots}
              alt=""
              className="relative -top-6 right-40 2xl:-top-6 2xl:right-44"
            />
          </div>
          <div className="bg-white rounded-xl lg:-my-24 lg:py-4 xl:py-5 lg:0 xl:px-10 md:px-10 2xl:px-10 2xl:-my-20 overflow-hidden relative">
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <div className="text-[#0B83A5] font-bold flex flex-col items-center py-10 lg:py-4 xl:py-0 space-x-3 2xl:py-7">
                <img src={logo} alt="logo" className="h-12" />
                <p className="text-lg text-[#0B83A5]">
                  Welcome to Doc<span className="text-orange-400">IT</span>
                  Health
                </p>
              </div>
              <div className="space-y-5 lg:space-y-3">
                <div className="">
                  <Controller
                    control={control}
                    name="userName"
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        fullWidth
                        label="Username"
                        type="text"
                        size="small"
                        value={value}
                        onChange={onChange}
                        {...register("userName")}
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
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        fullWidth
                        label="Password"
                        size="small"
                        type={showPassword ? "text" : "password"}
                        value={value}
                        onChange={onChange}
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
              </div>
              <div className="mt-1 text-right text-[#0B83A5] ">
                <a href="/" className="hover:text-red-500 lg:text-sm">
                  Forgot Password?
                </a>
              </div>
              <div className="flex items-center space-x-3 my-6 lg:my-2 2xl:my-3">
                <div className="w-full">
                  <hr />
                </div>
                <div className="text-slate-300">OR</div>
                <div className="w-full">
                  <hr />
                </div>
              </div>
              <div className="text-center my-6 lg:my-2 2xl:my-6 lg:text-sm">
                <p>Enter Passcode</p>
              </div>
              <div className="flex justify-between space-x-3 lg:space-x-2 overflow-hidden">
                <input
                  name=""
                  type="text"
                  maxLength={1}
                  value={num1}
                  onChange={onChangeNum1}
                  // ref={num1Ref}
                  className="border-2 rounded-lg w-12 h-12 lg:w-10 lg:h-10  text-center"
                />
                <input
                  name=""
                  type="text"
                  maxLength={1}
                  value={num2}
                  onChange={onChangeNum2}
                  ref={num2Ref}
                  className="border-2 rounded-lg w-12 h-12 lg:w-10 lg:h-10  text-center"
                />
                <input
                  name=""
                  type="text"
                  maxLength={1}
                  value={num3}
                  onChange={onChangeNum3}
                  ref={num3Ref}
                  className="border-2 rounded-lg w-12 h-12 lg:w-10 lg:h-10  text-center"
                />
                <input
                  name=""
                  type="text"
                  maxLength={1}
                  value={num4}
                  onChange={onChangeNum4}
                  ref={num4Ref}
                  className="border-2 rounded-lg w-12 h-12 lg:w-10 lg:h-10 text-center"
                />
                <input
                  name=""
                  type="text"
                  maxLength={1}
                  value={num5}
                  onChange={onChangeNum5}
                  ref={num5Ref}
                  className="border-2 rounded-lg w-12 h-12 lg:w-10 lg:h-10 text-center"
                />
                <input
                  name=""
                  type="text"
                  maxLength={1}
                  value={num6}
                  onChange={onChangeNum6}
                  // onKeyUp={handleKeyDown}
                  ref={num6Ref}
                  className="border-2 rounded-lg w-12 h-12 lg:w-10 lg:h-10  text-center"
                />
                <input
                  name=""
                  type="text"
                  maxLength={1}
                  value={num7}
                  onChange={onChangeNum7}
                  // onKeyUp={handleKeyDown}
                  ref={num7Ref}
                  className="border-2 rounded-lg w-12 h-12 lg:w-10 lg:h-10  text-center"
                />
                <input
                  name=""
                  type="text"
                  maxLength={1}
                  value={num8}
                  onChange={onChangeNum8}
                  // onKeyUp={handleKeyDown}
                  ref={num8Ref}
                  className="border-2 rounded-lg w-12 h-12 lg:w-10 lg:h-10 text-center"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-[#0B83A5] rounded-lg text-white text-center py-3 w-full my-12 lg:my-6"
                >
                  LogIn
                </button>
              </div>
            </form>
          </div>
          <div className="w-full flex justify-end ml-28 2xl:w-full">
            <div className="hidden lg:block">
              <img
                src={dots}
                alt=""
                className="w-56 2xl:w-full mt-6 2xl:left-[450px]"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
