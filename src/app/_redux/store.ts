
import {configureStore}from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { postsReducer } from "./postsSlice";




export const store = configureStore({
    reducer: {
        // waiting for reducername,
        authReducer,
        postsReducer
    } 

})



export type State =  ReturnType <typeof store.getState>

export type AppDispatch= typeof store.dispatch