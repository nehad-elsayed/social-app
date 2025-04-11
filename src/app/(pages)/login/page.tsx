"use client";
import {
  setError,
  setLoading,
  setIsLoggedIn,
  setToken,
} from "@/app/_redux/authSlice";
import { State, store } from "@/app/_redux/store";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  // const [IsLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useRouter();
  const dispatch = useDispatch();

  const { isLoading, isLoggedIn } = useSelector(
    (store: State) => store.authReducer
  );
  //we use the hook (useDispatch to call any action creator inside it ) // important note
  // Using Fetch instead of axios
  // async function login(values : { email: string, password: string }) {
  //   let response = await fetch(`https://linked-posts.routemisr.com/users/signin`,
  //     {
  //       method: "POST",
  //       body: JSON.stringify(values), //مع فيتش لازم احول الداتا ل استرنجفاي
  //       headers: {
  //         " Content-type": "application/json", // عشان اقول نوع الداتا اللي هبعتها السطر ده ثابت لما اجي ابعت اوبجكت للباك اند مع فيتش وتايب اسكربت
  //       },
  //     }
  //   );

  //   let data = await response.json();
  //   console.log(data);
  // }

  // calling api with axios

  // async function login (values: {email:string, password:string}){

  //   const {data}=await axios.post(`https://linked-posts.routemisr.com/users/signin`,
  //    values
  //   )
  //   console.log(data)
  //   navigate.push("/")

  // }

  type SignInResponse = {
    token: string;
    message?: string;
  };

  async function login(values: { email: string; password: string }) {
    dispatch(setLoading());

    try {
      const response = await axios.post<SignInResponse>(
        "https://linked-posts.routemisr.com/users/signin",
        values
      );

      const data = response.data;
      console.log(data);

      navigate.push("/")
      if (response.data.message == "success") {
        dispatch(setToken(data.token));
        toast.success("success");
        dispatch(setIsLoggedIn(true));
      }
    } catch (error: any) {
      // console.error(
      //   "Login failed:",
      //   error?.response?.data?.message || error.message
      // );
      dispatch(setError(error));
      toast.error("incorrect Email or password");
    }
  }

  let { values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: login,
  });

  return (
    <>
      <Paper
        elevation={5}
        sx={{ width: {xs:"95%",md:"50%",}, mx: "auto", padding: "1rem", my: 3 }}
        
      >
        <Typography variant="h2" sx={{ textAlign: "center" }}>
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            padding: "1rem",
          }}
        >
          <TextField
            onChange={handleChange}
            value={values.email}
            id="email"
            label="Email"
            type="email"
            variant="standard"
          />
          <TextField
            id="password"
            onChange={handleChange}
            value={values.password}
            label="Password"
            type="password"
            variant="standard"
          />
          <Button
            disabled={isLoading == true}
            type="submit"
            variant="contained"
          >
            {" "}
            {!isLoading ? "Login" : <CircularProgress size="30px" />}{" "}
          </Button>
        </Box>
      </Paper>
    </>
  );
}
