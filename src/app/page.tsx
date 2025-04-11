"use client";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "./loading";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, State } from "./_redux/store";
import { getPosts } from "./_redux/postsSlice";
import PostDetails from "./_components/postDetails/postDetails";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { loading, posts } = useSelector((state: State) => state.postsReducer);
  const dispatch = useDispatch<AppDispatch>();
  //to protect home route should check frist if we have token or not
  const { push } = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      push("/login");
    } else {
      setIsLoading(false);
      dispatch(getPosts());
    }
  }, []);

  return <>{isLoading || loading ? <Loading /> : posts.map((post)=>{ return <PostDetails key={post._id} post={post}/> })}</>;
}
