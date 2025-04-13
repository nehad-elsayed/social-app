"use client";
import PostDetails from "@/app/_components/postDetails/postDetails";
import { getSinglePost } from "@/app/_redux/postsSlice";
import { AppDispatch, State } from "@/app/_redux/store";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostLoading from "../postLoading";

export default function SinglePost() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, post } = useSelector((state: State) => state.postsReducer);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getSinglePost(`${id}`));
  }, [dispatch,id]);

  return <>
  {loading ? <PostLoading /> : post && <PostDetails post={post} displayComments={true} />}
  
  </>;
}
