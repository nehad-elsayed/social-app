"use client";
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
import DeleteIcon from "@mui/icons-material/Delete";
import { Comment, Post } from "@/interfaces/postsData";
import Image from "next/image";
import Link from "next/link";
import { Box, Button, TextField } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { deletePost } from "@/app/_redux/postsSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/_redux/store";
import toast from "react-hot-toast";
import ModalDeletePost from "../ModalDeletePost/ModalDeletePost";

interface MyJwtPayload {
  user: string;
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
const ExpandMore = styled(
  (props: IconButtonProps) => {
    return <IconButton {...props} />;
  },
  {
    shouldForwardProp: (prop) => prop !== "expand",
  }
)<ExpandMoreProps>(({ theme, expand }) => ({
  marginLeft: "auto",
  transform: expand ? "rotate(180deg)" : "rotate(0deg)",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function PostDetails({
  post,
  displayComments = false,
}: {
  post: Post;
  displayComments?: boolean;
}) {
  const [expanded, setExpanded] = React.useState(false);
  const [commentValue, setCommentValue] = React.useState("");
  const [currentUserId, setCurrentUserId] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch<AppDispatch>();
  const handleDeletePost = async () => {
    try {
      await dispatch(deletePost(post._id)).unwrap();
      toast.success("Post deleted successfully");
      handleClose();
    } catch (error) {
      toast.error("Failed to delete post");
      console.error("Error deleting post:", error);
    }
  };

  React.useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      try {
        const decoded = jwtDecode<MyJwtPayload>(token);
        setCurrentUserId(decoded.user);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  // Helper function to format date consistently
  const formatDate = (dateString: string): string => {
    if (!dateString) return "";
    return dateString.split("T")[0];
  };

  // Check if current user is the post owner
  const isPostOwner = currentUserId === post.user._id;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  //==========>>>Using Fetchhhh ===>
  const [comments, setComments] = React.useState([]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const values = {
      content: form.comment.value,
      post: post._id,
    };

    // Safely get token from localStorage (only on client-side)
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const response = await fetch(
      `https://linked-posts.routemisr.com/comments`,
      {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          token: token || "",
          "Content-Type": "Application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    setComments(data.comments);
    // Clear the comment field after successful submission
    setCommentValue("");
  }

  React.useEffect(() => {
    if (displayComments) {
    }
  }, [displayComments]);
  return (
    <Card sx={{ mx: "auto", my: 3, width: { md: "50%" } }} elevation={3}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            <Image
              src={post.user.photo}
              alt={post.user.name}
              width={40}
              height={40}
              priority
            />
          </Avatar>
        }
        action={
          isPostOwner && (
            <IconButton aria-label="delete">
              <DeleteIcon onClick={handleOpen} />
            </IconButton>
          )
        }
        title={post.user.name}
        subheader={formatDate(post.createdAt)}
      />
      {open && (
        <ModalDeletePost
          handleDeletePost={handleDeletePost}
          open={open}
          handleClose={handleClose}
        />
      )}
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
          height={400}
          priority
          style={{ objectFit: "cover" }}
          className="post-img"
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
                      width={40}
                      height={40}
                      priority
                      style={{ marginInline: "auto" }}
                    />
                  ) : (
                    post.comments[0].commentCreator.name.slice(0, 1)
                  )}{" "}
                </Avatar>
              }
              title={post.user.name}
              subheader={formatDate(post.createdAt)}
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
        ) : post.comments.length > comments.length && displayComments ? (
          post.comments.map((comment: Comment) => {
            return (
              <CardContent
                key={comment._id}
                sx={{ my: "20px", backgroundColor: "#eee" }}
              >
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      {!comment.commentCreator.photo.includes("undefined") ? (
                        <Image
                          src={comment.commentCreator.photo}
                          alt={comment.commentCreator.name}
                          width={40}
                          height={40}
                          priority
                          style={{ marginInline: "auto" }}
                        />
                      ) : (
                        comment.commentCreator.name.slice(0, 1)
                      )}
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={comment.commentCreator.name}
                  subheader={formatDate(comment.createdAt)}
                />
                <Typography sx={{ marginBottom: 2, width: "80%", mx: "auto" }}>
                  {comment.content}
                </Typography>
              </CardContent>
            );
          })
        ) : (
          comments.map((comment: Comment) => {
            return (
              <CardContent
                key={comment._id}
                sx={{ my: "20px", backgroundColor: "#eee" }}
              >
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      {!comment.commentCreator.photo.includes("undefined") ? (
                        <Image
                          src={comment.commentCreator.photo}
                          alt={comment.commentCreator.name}
                          width={40}
                          height={40}
                          priority
                          style={{ marginInline: "auto" }}
                        />
                      ) : (
                        comment.commentCreator.name.slice(0, 1)
                      )}
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={comment.commentCreator.name}
                  subheader={formatDate(comment.createdAt)}
                />
                <Typography sx={{ marginBottom: 2, width: "80%", mx: "auto" }}>
                  {comment.content}
                </Typography>
              </CardContent>
            );
          })
        )}

        <Box
          component="form"
          onSubmit={(e) => handleSubmit(e)}
          sx={{ display: "flex", gap: "1rem", padding: "10px" }}
        >
          <TextField
            name="comment"
            sx={{ flexGrow: 1 }}
            type="text"
            id="comment"
            label="comment"
            placeholder="Write Comment..."
            variant="outlined"
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
          />
          <Button
            type="submit"
            sx={{ alignSelf: "center", textTransform: "capitalize" }}
            variant="contained"
          >
            Comment
          </Button>
        </Box>
      </Collapse>
    </Card>
  );
}
