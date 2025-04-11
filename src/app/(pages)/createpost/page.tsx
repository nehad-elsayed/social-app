"use client";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function CreatePost() {
  const [image, setImage] = useState(null);
  const [body, setBody] = useState("");
  const { push } = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    //كده حددت ان العنصر اللي هتارجته هوا الفروم ومن نوع اتش تي ام ال فورم اليمينت
    // عشان اسحب الفاليوز من الانبوتس باخد نسخه من الفورم داتا عن طريق نيوو وابدا اضيف عليها البادي والصوره
    const formData = new FormData();


        // console.log( form.body.value)
    // console.log( form.body.files[0])


    
    formData.append("body", form.body.value);
    formData.append("image", form.image.files[0]);

    //عشان ممكن نكتب بوست من غير صوره او نرفع صوره من غير بوست 
    // if (image != null) {
    //   formData.append("image", image);
    // }
    // if (body.trim() != "") {
    //   formData.append("body", body);
    // }



    const { data } = await axios.post(
      "https://linked-posts.routemisr.com/posts",
      formData,
      {
        headers: {
          token: localStorage.getItem("token") || "",
        },
      }
    );
    toast.success(data.message);
    push("/profile")
  }



  return (
    <>
      <Paper
        elevation={5}
        sx={{
          width: { xs: "95%", md: "50%" },
          mx: "auto",
          padding: "1rem",
          my: 3,
        }}
      >
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Add New Post
        </Typography>
        <Box
          component="form"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            padding: "1rem",
          }}
        >
          <TextField
            name="body"
            id="body"
            type="text"
            variant="standard"
            placeholder="What's exist in your mind"
          />
          <TextField id="image" name="image" type="file" variant="standard" />
          <Button type="submit" variant="contained">
            Add
          </Button>
        </Box>
      </Paper>
    </>
  );
}
