import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import { Comment, Post } from "@/interfaces/postsData";
import Image from "next/image";
import Link from "next/link";
import { Box, Button, TextField } from "@mui/material";
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const {...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

export default function PostDetails({post,displayComments = false,}: {post: Post , displayComments?: boolean;}){
const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  // ===>>> Using Axios ===>>>

// async function handleSubmit(e:React.FormEvent){
//   e.preventDefault();
//   const form = e.target as HTMLFormElement 
//   const values = {
//     content: form.comment.value,
//     post: post._id
//   }

// const {data} = await axios.post("https://linked-posts.routemisr.com/comments", values,{
//   headers:{
//     "token": `${localStorage.getItem("token")}`
//   }
// })

// console.log(data);
// setComments(data.comments)
// }


//==========>>>Using Fetchhhh ===>
const [comments,setComments]=React.useState([])

async function handleSubmit(e:React.FormEvent){
  e.preventDefault();
  const form = e.target as HTMLFormElement 
  const values = {
    content : form.comment.value,
    post: post._id
  }

  const response = await fetch(`https://linked-posts.routemisr.com/comments`,{
    method:"POST",
    body: JSON.stringify(values),
   headers:{
    "token" : `${localStorage.getItem("token")}`,
    "Content-Type":"Application/json"
   }})
   const data = await response.json()
console.log(data)
setComments(data.comments)
}


  return (
    <Card sx={{ mx: "auto", my: 3, width: { md: "50%" } }} elevation={4}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            <Image
              src={post.user.photo}
              alt={post.user.name}
              style={{ width: "100%", height: "auto" }}
              width={40}
              height={40}
            />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post.user.name}
        subheader={post.createdAt.split("T", 1)}
      />
      <CardContent>
        {post.body && (
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {post.body}
          </Typography>
        )}
      </CardContent>
      {post.image && (
        <Image
          src={post.image}
          alt={`${post.body}`}
          width={400}
          height={300}
          style={{ width: "100%", objectFit: "cover" }}
        />
      )}

      <CardActions
        sx={{
          width: "70%",
          display: "flex",
          justifyContent: "space-between",
          mx: "auto",
        }}
      >
        <IconButton aria-label="add to favorites">
          <ThumbUpIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          style={{
            fontSize: "16px",
            display: "flex",
            justifyContent: "space-between",
            gap: "5px",
          }}
        >
          {post.comments.length} <CommentIcon />
        </ExpandMore>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {post.comments.length > 0 && displayComments == false ? (
          <CardContent sx={{ my: "20px", backgroundColor: "#eee" }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {!post.comments[0].commentCreator.photo.includes(
                    "undefined"
                  ) ? (
                    <Image
                      src={post.comments[0].commentCreator.photo}
                      alt={post.comments[0].commentCreator.name}
                      style={{ width: "100%", height: "auto" }}
                      width={40}
                      height={40}
                    />
                  ) : (
                    post.comments[0].commentCreator.name.slice(0, 1)
                  )}{" "}
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={post.user.name}
              subheader={post.createdAt.split("T", 1)}
            />
            <Typography sx={{ marginBottom: 2, width: "80%", mx: "auto" }}>
              {post.comments[0].content}
            </Typography>
            <Link
              href={`/singlepost/${post._id}`}
              style={{
                textAlign: "right",
                textDecoration: "none",
                color: "#01c",
                display: "block",
                width: "100%",
              }}
            >
              Veiw More Comments
            </Link>{" "}
          </CardContent>
        ) : (
          post.comments.length > comments.length &&
          displayComments ? 
          post.comments.map((comment: Comment) => {
            return (<CardContent key={comment._id} sx={{ my: "20px", backgroundColor: "#eee" }}>
                <CardHeader avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      {!comment.commentCreator.photo.includes("undefined") ? (
                        <Image src={comment.commentCreator.photo}
                          alt={comment.commentCreator.name}
                          style={{ width: "100%", height: "auto" }}
                          width={40}
                          height={40} />) : (comment.commentCreator.name.slice(0, 1))}
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={comment.commentCreator.name}
                  subheader={comment.createdAt.split("T", 1)}
                />
                <Typography sx={{ marginBottom: 2, width: "80%", mx: "auto" }}>
                  {comment.content}
                </Typography>
                
              </CardContent> )})
       :   comments.map((comment: Comment) => {
        return (<CardContent key={comment._id} sx={{ my: "20px", backgroundColor: "#eee" }}>
            <CardHeader avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {!comment.commentCreator.photo.includes("undefined") ? (
                    <Image src={comment.commentCreator.photo}
                      alt={comment.commentCreator.name}
                      style={{ width: "100%", height: "auto" }}
                      width={40}
                      height={40} />) : (comment.commentCreator.name.slice(0, 1))}
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={comment.commentCreator.name}
              subheader={comment.createdAt.split("T", 1)}
            />
            <Typography sx={{ marginBottom: 2, width: "80%", mx: "auto" }}>
              {comment.content}
            </Typography>
            
          </CardContent> )}) )}

        <Box component="form" onSubmit={(e)=>handleSubmit(e)} sx={{display:"flex" ,gap:"1rem" ,padding:"10px"}}>
          <TextField name="comment" sx={{flexGrow:1}} type="text" id="comment" label="comment" placeholder="Write Comment..."  variant="outlined"   />
        <Button type="submit" sx={{alignSelf:"center",textTransform:"capitalize"}} variant="contained">Comment</Button>
        </Box>
      </Collapse>
    </Card>
  );
}
