import { string } from "yup";
import { Post } from "./../../interfaces/postsData";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// type initialState = {
//   loading: boolean;
//   posts: Post[];
//   post:Post
//   error: any;
// };

// const initialState: initialState = {
//   loading: false,
//   posts: [],
//   post: {},
//   error: null,
// };

const initialState= {
  loading :false as boolean,
  posts: [] as Post[],
  post: null as Post|null,
  error: null as any
}

//using fetch
// export const getPosts = createAsyncThunk("posts/getPosts", async () => {
//   let response = await fetch(`https://linked-posts.routemisr.com/posts`, {
//     method: "GET",
//     headers: {
//       token: localStorage.getItem("token") || "", //to avoid headers error //`${localstorage.getItem("token")}` , or !localstorage.getItem("token")
//       "Content-Type": "application/json",
//     },
//   });

//   let data = await response.json();
// console.log(data)
//   return data.posts;
// });

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  const {data} =await axios.get("https://linked-posts.routemisr.com/posts?page=97",
    {
        headers:{
            "token" :localStorage.getItem("token") || ""
        }
    }
    
  )
    return data.posts.reverse();
  });
// ====>>>> calling api to get single post

export const getSinglePost = createAsyncThunk("posts/getSinglePost", async (postId:string) => {
  const {data} =await axios.get(`https://linked-posts.routemisr.com/posts/${postId}`,
    {
        headers:{
            "token" :localStorage.getItem("token") || ""
        }
    }
    
  )
  console.log(data)
    return data.post;
  });

//get user posts
  export const getUserPosts = createAsyncThunk("posts/getUserPosts", async (UserID:string) => {
    const {data} =await axios.get(`https://linked-posts.routemisr.com/users/${UserID}/posts`,
      {
          headers:{
              "token" :localStorage.getItem("token") || ""
          }
      }
      
    )
    console.log(data)
      return data.posts.reverse();
    });


const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(getSinglePost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSinglePost.fulfilled, (state, action) => {
      state.loading = false;
      state.post = action.payload;
    });
    builder.addCase(getSinglePost.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(getUserPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    });
    builder.addCase(getUserPosts.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});


export const postsReducer=postsSlice.reducer