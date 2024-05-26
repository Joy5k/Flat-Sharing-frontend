"use client"
import React, { useState } from 'react';
import { Box, IconButton,Button, Typography } from '@mui/material';

const flatRequestPage=({params}:any)=>{
    

    return (
        <Box>
        <Typography>flatRequestId: {params.flatRequestId}</Typography>
      </Box>
    )
}
export default flatRequestPage;