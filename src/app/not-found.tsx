import { Box, Typography } from "@mui/material";
import React from "react";

export default function NotFound() {
  return (
    <>
      <Box>
        <Typography component="h1" variant="h2" sx={{color:"red" , fontSize:"3rem",textAlign:"center"}}>
          <Box component="span">Error 404!!</Box> Not-Found
        </Typography>
      </Box>
    </>
  );
}
