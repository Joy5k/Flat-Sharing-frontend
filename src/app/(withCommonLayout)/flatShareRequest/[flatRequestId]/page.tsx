"use client";
import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useFlatRequestPostMutation } from '@/redux/api/flatRequest';

const FlatRequestPage = ({ params }: any) => {
  const [flatRequestPost, { isLoading }] = useFlatRequestPostMutation();

  const handlePostFlatRequest = async () => {
    const res = await flatRequestPost({ params });
    console.log(res,"this is response from flat request post api");
  };

  return (
    <Box>
      <Typography>Your Name: <TextField id="standard-basic" label="Standard" variant="standard" disabled /></Typography>
      <Typography>Your Email: <TextField id="standard-basic" label="Standard" variant="standard" disabled /></Typography>
      <Typography>Your Location: <TextField id="standard-basic" label="Standard" variant="standard" disabled /></Typography>
      <Typography>Your Phone: <TextField id="standard-basic" label="Standard" variant="standard" disabled /></Typography>
      <Button onClick={handlePostFlatRequest} disabled={isLoading}>
        Post Flat Request
      </Button>
      {isLoading && <Typography>Loading...</Typography>}
    </Box>
  );
};

export default FlatRequestPage;
