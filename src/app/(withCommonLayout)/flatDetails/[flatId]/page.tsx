"use client";

import { useGetSingleFlatQuery } from "@/redux/api/flatApi";
import React, { useState } from 'react';
import { Box, IconButton, Paper, Typography } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Image from 'next/image';

const FlatDetailsPage = ({ params }: any) => {
  const { data, isLoading, error } = useGetSingleFlatQuery(params.flatId);
  const [currentIndex, setCurrentIndex] = useState(0);
console.log(data?.photos,"The photos")
  if (isLoading) {
    return <Typography variant="body1" sx={{
      height:"100vh",
      color:"primary.main",
      fontWeight:"600",
      fontSize:"30px",
      textAlign:"center",
      margin:"50px auto"
      
    }}>Loading flat details...</Typography>;
  }

  if (error) {
    return (
      <Typography variant="body1" color="error" sx={{
        height:"100vh",
        color:"red",
        fontWeight:"600",
        fontSize:"30px",
        textAlign:"center",
        margin:"50px auto"
      }}>
        Error fetching flat details.
      </Typography>
    );
  }

  const flat = data;
  const photos = flat?.photos || [];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '600px', margin: '10px auto', }}>
      <Paper elevation={3} sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={handlePrev} sx={{ color: 'primary.main', position: 'absolute', left: 0, zIndex: 1 }}>
          <KeyboardArrowLeftIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1, display: 'flex', 
        justifyContent: 'center',
        width: '100%', 
        maxWidth: '600px', 
        height:"400px",
        boxShadow: 'none',
        margin: '0 auto' 
        }}>
          <Image
            src={photos[currentIndex]?.imageUrl}
            alt={`Flat image ${currentIndex + 1}`}
            layout="intrinsic"
            width={600}
            height={400}
            objectFit="cover"
          />
        </Box>
        <IconButton onClick={handleNext} sx={{ color: 'primary.main', position: 'absolute', right: 0, zIndex: 1 }}>
          <KeyboardArrowRightIcon />
        </IconButton>
      </Paper>
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" sx={{
          margin:"5px 0"
        }}>Flat Location: {flat?.location}</Typography>
        <Typography variant="body1" sx={{ mt: 1,mb:5 }}>Flat Details Informations: {flat?.description}</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Rent: ${flat?.rentAmount} | Bedrooms: {flat?.bedrooms}
        </Typography>
      </Box>
    </Box>
  );
};

export default FlatDetailsPage;
