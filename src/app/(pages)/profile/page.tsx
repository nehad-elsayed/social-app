// "use client";
// import { getUserPosts } from "@/app/_redux/postsSlice";
// import { AppDispatch, State } from "@/app/_redux/store";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { jwtDecode } from "jwt-decode";
// import Loading from "@/app/loading";
// import PostDetails from "@/app/_components/postDetails/postDetails";
// import { Typography } from "@mui/material";

// interface MyJwtPayload {
//   user: string;
// }

// export default function Profile() {
//   const { loading, posts } = useSelector((state: State) => state.postsReducer);

//   const dispatch = useDispatch<AppDispatch>();

//   const x = jwtDecode<MyJwtPayload>(`${localStorage.getItem("token")}`);
//   console.log(x);
//   //الايدي بيبقي جوا اليوزر اللي ف الاكس ف بنخزنه ف متغير ونبعته للفانكشن ف اليوز افكت
//   const id = x.user;

//   useEffect(() => {
//     dispatch(getUserPosts(id));
//   }, [dispatch, id]);

// if(loading){
//   return <Loading/>
// }

//   return <>

//   {
//     posts ?  posts.map((post)=>{
//       return <PostDetails post={post} key={post._id} displayComments={false}/>
//     })
//  : <> <Typography sx={{textAlign:"center",color:"blue",marginBlock:"1rem"}}>No Posts Yet</Typography> </> }

//   </>;

// }

"use client";

import { getUserPosts } from "@/app/_redux/postsSlice";
import { AppDispatch, State } from "@/app/_redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import Loading from "@/app/loading";
import PostDetails from "@/app/_components/postDetails/postDetails";
import { Typography } from "@mui/material";

interface MyJwtPayload {
  user: string;
}

export default function Profile() {
  const { loading, posts } = useSelector((state: State) => state.postsReducer);
  const dispatch = useDispatch<AppDispatch>();

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode<MyJwtPayload>(token);
      setUserId(decoded.user);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch(getUserPosts(userId));
    }
  }, [dispatch, userId]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <PostDetails post={post} key={post._id} displayComments={false} />
        ))
      ) : (
        <Typography
          sx={{ textAlign: "center", color: "blue", marginBlock: "1rem" }}
        >
          No Posts Yet
        </Typography>
      )}
    </>
  );
}
