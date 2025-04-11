import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';

export default function Variants() {
  return (
   <Box sx={{width:"50%" , mx:"auto"}}> <Stack spacing={1}>
   <Skeleton variant="text" sx={{ fontSize: '1rem' }} />

   <Skeleton variant="circular" width={80}   height={80} />
   <Skeleton variant="rectangular"   height={100} />
   <Skeleton variant="rounded"    height={100} />
 </Stack></Box>
  );
}
