import { Box, Button, Modal, Typography } from '@mui/material';
import React from 'react'





 export default function ModalDeletePost( {handleDeletePost, open, handleClose}: {handleDeletePost: () => void, open: boolean, handleClose: () => void} ) {

    return (
      <>
        <Modal sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} open={open} onClose={handleClose}>
          <Box sx={{ backgroundColor: "white", padding: "20px", borderRadius: "10px" , display: "flex", flexDirection: "column", gap: "10px" }}>
            <Typography variant="h6">Are you sure you want to delete this post?</Typography>
           <Box sx={{ display: "flex", gap: "10px" }}>
           <Button onClick={handleClose} variant="contained" color="primary">Cancel</Button>
           <Button onClick={handleDeletePost} variant="contained" color="error">Delete</Button>
           </Box>
          </Box>
        </Modal>
      </>
    );
  }