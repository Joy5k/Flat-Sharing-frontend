"use client"

import * as React from 'react';
import { useEffect,useState } from 'react';
import {
    Box,
    Typography,
  } from "@mui/material";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useGetAllFlatPostsAdminQuery } from '@/redux/api/flatApi';
import DetailsIcon from '@mui/icons-material/Details';
import Link from "next/link";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function FlatCard() {

    const { data, isLoading } = useGetAllFlatPostsAdminQuery()
  return (
   <Box sx={{margin:"100px 0 0 0"}}>
    {isLoading ? <Typography color="text.secondary">
         Loading...
         </Typography>:
 <Grid container spacing={2}>
 {data.map((flat:any) => (
   <Grid item key={flat.id} xs={12} sm={6} md={4}>
     <Card sx={{ width: 345, height:440, marginBottom: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',}}>
       <CardHeader
       
         title={flat.location}
         subheader={`Rent: ${flat.rentAmount} | Bedrooms: ${flat.bedrooms}`}
       />
       <CardMedia
component="img"
height="194"
image={flat.photos[0] ? flat.photos[0].imageUrl : "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg"}
         alt={flat.location}
         sx={{width: 345, height: 200,}}
/>

       <CardContent>
         
         <Typography variant="body2" color="text.secondary">
         {flat.description.length > 150 ? `${flat.description.substring(0, 80)}...` : flat.description}
         </Typography>

       </CardContent>

       <CardActions
      disableSpacing
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 2,
        padding: 2
      }}
    >
      <Button
        variant="contained"
        component={Link}
        href={`/flatDetails/${flat.id}`}
        sx={{
          backgroundColor: "#F1C40F",
          '&:hover': {
            backgroundColor: "#D4AC0D",
          },
        }}
      >
        <EditIcon /> Edit
      </Button>

      <Button
        variant="contained"
        sx={{
          backgroundColor: "#F1948A",
          '&:hover': {
            backgroundColor: "#B03A2E",
          },
        }}
      >
        <DeleteIcon /> Delete
      </Button>
    </CardActions>
     </Card>
   </Grid>
 ))}
</Grid>

}
   </Box>
  );
}
