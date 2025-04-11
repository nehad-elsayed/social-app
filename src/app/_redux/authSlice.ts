import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import Cookies from "js-cookie"

type initialState = {
  token: null | string;
  isLoading: boolean;
  error: null | string;
  isLoggedIn:boolean
};

const initialState: initialState = {
  token: localStorage.getItem("token"),
  isLoading: false,
  error: null,
  isLoggedIn: !!localStorage.getItem("token")
};

//another solutaion to select initial state type
// => we can select it in one line =>
// const initialState = { token :null as null|string, isLoading:false as Boolean , error:null as null|string}

export const authSLice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // write all action creators here as properties (key,value) and its values is arrow function //
    setLoading: (state) => {
      state.isLoading = true;
    },

    setToken: (state, action) => {
      state.isLoading = false;
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
      
    },
    setIsLoggedIn:(state,action)=>{
      state.isLoggedIn=action.payload
    }
    ,
    setError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    removeToken: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const authReducer = authSLice.reducer;

export const { setToken, setError, setLoading, removeToken ,setIsLoggedIn} =
  authSLice.actions;
