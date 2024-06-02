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
import { useGetFlatPostsQuery } from '@/redux/api/flatApi';
import DetailsIcon from '@mui/icons-material/Details';
import Link from "next/link";

export default function FlatCard({ searchData }: any) {

    const { data, isLoading } = useGetFlatPostsQuery(searchData)
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
         {flat.description.length > 150 ? `${flat.description.substring(0, 100)}...` : flat.description}
         </Typography>

       </CardContent>

       <CardActions disableSpacing>
         
         <Button  variant="contained" component={Link} href={`/flatDetails/${flat.id}`} sx={{margin:"0 auto"}}><DetailsIcon/> Details</Button>
       </CardActions>
     </Card>
   </Grid>
 ))}
</Grid>}
   </Box>
  );
}
