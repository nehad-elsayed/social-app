'use client';

import { Box, Container, Grid, Typography } from '@mui/material';
import Link from 'next/link';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        py: 4,
        mt: 8,
      }}
    >
      <Container maxWidth="lg" sx={{textAlign:"center"}}>
        <Grid container sx={{textAlign:"center"}} spacing={5}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Circle 
            </Typography>
            <Typography variant="body2">
              &copy; {new Date().getFullYear()} Your Company. All rights reserved.
            </Typography>
          </Grid>

          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" gutterBottom>
              Company
            </Typography>
            <Link  href="/about" color="inherit" style={{marginBlock:"10px"}} >About</Link><br />
            <Link  href="#" color="inherit" >Careers</Link>
          </Grid>

          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" gutterBottom>
              Support
            </Typography>
            <Link  href="#" color="inherit" style={{marginBlock:"10px"}}  >Contact</Link><br />
            <Link  href="#" color="inherit" >FAQ</Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
