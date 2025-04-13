"use client";
import { getUserPosts } from "@/app/_redux/postsSlice";
import { AppDispatch, State } from "@/app/_redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import Loading from "@/app/loading";
import PostDetails from "@/app/_components/postDetails/postDetails";

interface MyJwtPayload {
  user: string; 
}

export default function Profile() {
  const { loading, posts } = useSelector((state: State) => state.postsReducer);

  const dispatch = useDispatch<AppDispatch>();

  const x = jwtDecode<MyJwtPayload>(`${localStorage.getItem("token")}`);
  console.log(x);
  //الايدي بيبقي جوا اليوزر اللي ف الاكس ف بنخزنه ف متغير ونبعته للفانكشن ف اليوز افكت
  const id = x.user;

  useEffect(() => {
    dispatch(getUserPosts(id));
  }, [dispatch, id]);

  return <>
  
  
  {
    loading? <Loading/> : posts.map((post)=>{
      return <PostDetails post={post} key={post._id} displayComments={false}/>
    })
  }
  
  
  </>;



}
