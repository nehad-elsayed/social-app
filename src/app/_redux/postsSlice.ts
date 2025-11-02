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

type initialState = {
  loading: boolean;
  posts: Post[];
  post: Post | null;
};

const initialState: initialState = {
  loading: false,
  posts: [],
  post: null,
};

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
  const { data } = await axios.get("https://linked-posts.routemisr.com/posts", {
    headers: {
      token: localStorage.getItem("token") || "",
    },
  });
  return data.posts.reverse();
});
// ====>>>> calling api to get single post

export const getSinglePost = createAsyncThunk(
  "posts/getSinglePost",
  async (postId: string) => {
    const { data } = await axios.get(
      `https://linked-posts.routemisr.com/posts/${postId}`,
      {
        headers: {
          token: localStorage.getItem("token") || "",
        },
      }
    );
    console.log(data);
    return data.post;
  }
);

//get user posts
export const getUserPosts = createAsyncThunk(
  "posts/getUserPosts",
  async (UserID: string) => {
    const { data } = await axios.get(
      `https://linked-posts.routemisr.com/users/${UserID}/posts`,
      {
        headers: {
          token: localStorage.getItem("token") || "",
        },
      }
    );
    console.log(data);
    return data.posts.reverse();
  }
);
// https://linked-posts.routemisr.com/posts/66875b3b006c4ff191a61a89
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId: string) => {
    const { data } = await axios.delete(
      `https://linked-posts.routemisr.com/posts/${postId}`,
      {
        headers: {
          token: localStorage.getItem("token") || "",
        },
      }
    );
    // Return postId so it can be used in the fulfilled handler
    return postId;
  }
);

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

    builder.addCase(getSinglePost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSinglePost.fulfilled, (state, action) => {
      state.loading = false;
      state.post = action.payload;
    });

    builder.addCase(getUserPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    });
    builder.addCase(deletePost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.loading = false;
      // Use action.meta.arg to get the postId that was passed to the thunk
      const postId = action.meta.arg;
      state.posts = state.posts.filter((post) => post._id !== postId);
    });
    builder.addCase(deletePost.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const postsReducer = postsSlice.reducer;
