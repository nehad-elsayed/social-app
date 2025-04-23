"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { MenuItem, Select } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { RegisterData } from "@/interfaces/registerData";

import axios from "axios";
import { useRouter } from "next/navigation";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function Register() {
  const {push} = useRouter();
  const initialValues: RegisterData = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    dateOfBirth: "",
    gender: "male"
  };

  function onSubmit() {
    // setErrMsg("");
    axios
      .post("https://linked-posts.routemisr.com/users/signup", values)
      .then(({ data }) => {
        console.log(data.message);
        if (data.message == "success") {
         push("/login");
        }
        console.log(data.message);
      })
      .catch((err) => {
        console.error(err.response.data.message);
      });
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("name is required")
      .min(3, "name must be at least 3 characters")
      .max(20, "name must be less than 20 character"),
    email: Yup.string()
      .required("email is required")
      .email("email is invalid")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
        "Invalid email address"
      ),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Invalid paassword"
      ),
    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("password")]),
  });

  const { values, handleSubmit, handleChange, handleBlur, errors, touched } =
    useFormik({
      initialValues,
      onSubmit,
      validationSchema,
    });

  return (
    <SignUpContainer  direction="column" justifyContent="space-between">
      <Card variant="outlined">
        {/* <SitemarkIcon /> */}
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Sign up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <FormControl>
            <FormLabel htmlFor="name">Full name</FormLabel>
            <TextField
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              id="name"
              variant="outlined"
              sx={{ marginTop: "5px" }}
              name="name"
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
              margin="normal"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              margin="normal"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              id="email"
              label="Ex.name@xyz.com"
              variant="outlined"
              sx={{ marginTop: "5px" }}
              name="email"
              type="email"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              value={values.password}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              margin="normal"
              onChange={handleChange}
              onBlur={handleBlur}
              id="password"
              variant="outlined"
              sx={{ marginTop: "5px" }}
              name="password"
              type="password"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="rePassword">Re password</FormLabel>
            <TextField
              value={values.rePassword}
              error={touched.rePassword && Boolean(errors.rePassword)}
              helperText={touched.rePassword && errors.rePassword}
              margin="normal"
              onChange={handleChange}
              onBlur={handleBlur}
              id="rePassword"
              variant="outlined"
              sx={{ marginTop: "5px" }}
              name="rePassword"
              type="password"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="dateOfBirth">Date Of Birth</FormLabel>
            <TextField
              value={values.dateOfBirth}
              helperText={errors.dateOfBirth}
              onChange={handleChange}
              id="dateOfBirth"
              variant="outlined"
              sx={{ marginTop: "5px" }}
              name="dateOfBirth"
              type="date"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="gender">Gender</FormLabel>
            <Select
            name="gender"
              value={values.gender}
              labelId="gender"
              onChange={handleChange}
            >
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"female"}>Female</MenuItem>
            </Select>
          </FormControl>
     
          <Button type="submit" fullWidth variant="contained">
            Sign up
          </Button>
        </Box>
        <Divider>
          <Typography sx={{ color: "text.secondary" }}>or</Typography>
        </Divider>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => alert("Sign up with Google")}
            
          >
            Sign up with Google
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => alert("Sign up with Facebook")}
            // startIcon={<FacebookIcon />}
          >
            Sign up with Facebook
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Already have an account?{" "}
            <Link href="/login" variant="body2" sx={{ alignSelf: "center" }}>
              Sign in
            </Link>
          </Typography>
        </Box>
      </Card>
    </SignUpContainer>
  );
}
