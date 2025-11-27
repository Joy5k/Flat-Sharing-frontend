"use client";
import * as React from 'react';
import { useState } from 'react';
import { Box, Typography, Grid, Card, CardHeader, CardMedia, CardContent, CardActions, Button, IconButton, keyframes } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useGetFlatPostsQuery } from '@/redux/api/flatApi';
import DetailsIcon from '@mui/icons-material/Details';
import Link from "next/link";
import { useAppDispatch } from '@/redux/hooks';
import { addProduct, removeProduct } from '@/redux/api/wishlist';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import { Spinner } from '@/utils/spinner';

// Keyframe animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

export default function FlatCard({ searchData }: any) {
  const dispatch = useAppDispatch();
  const [liked, setLiked] = useState<{ [key: string]: boolean }>({});
  const { data, isLoading } = useGetFlatPostsQuery(searchData);
  const productState = useSelector((state: any) => state.product);

  const handleLike = (flat: any) => {
    const newProduct={
      id: flat.id,
      name: flat.location,
      price: flat.rentAmount,
      image: flat.photos[0]?.imageUrl || "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg",
      userId: flat.userId,
      bedrooms: flat.bedrooms,
      description: flat.description,
      rentAmount: flat.rentAmount,
      location: flat.location,
      photos: flat.photos,
      createdAt: flat.createdAt,
      updatedAt: flat.updatedAt,
    };
    if(liked[flat.id]) {
      dispatch(removeProduct(newProduct.id));
      toast.error("Removed from wishlist!");
      setLiked((prevLiked) => ({ ...prevLiked, [flat.id]: !prevLiked[flat.id] }));

    }
    else {
      dispatch(addProduct(newProduct));
      toast.success("Added to wishlist successfully!");
      setLiked((prevLiked) => ({ ...prevLiked, [flat.id]: !prevLiked[flat.id] }));

    }

  };

  if (isLoading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}><Spinner></Spinner></Box>
  }

  return (
    <Box sx={{ margin: "100px 0 0 0", padding: 3 }}>
      <Grid container spacing={4}>
        {data?.map((flat: any, index: number) => (
          <Grid item key={flat.id} xs={12} sm={6} md={4}>
            <Card sx={{
              width: '100%',
              height: 500,
              marginBottom: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              animation: `${fadeIn} 0.6s ease-out ${index * 0.1}s both`,
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 12px 32px rgba(67, 188, 206, 0.2)',
              }
            }}>
              <CardHeader
                title={flat.location}
                subheader={`Rent: $${flat.rentAmount} | Bedrooms: ${flat.bedrooms}`}
                sx={{
                  bgcolor: '#43bcce10',
                  '& .MuiCardHeader-title': {
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    color: '#2a2a2a',
                  },
                  '& .MuiCardHeader-subheader': {
                    color: '#43bcce',
                    fontWeight: 600,
                  }
                }}
              />

              <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={flat.photos[0]?.imageUrl || "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg"}
                  alt={flat.location}
                  sx={{
                    width: '100%',
                    height: 200,
                    objectFit: 'cover',
                    transition: 'all 0.4s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    }
                  }}
                />
                <IconButton
                  aria-label="add to favorites"
                  onClick={() => handleLike(flat)}
                  sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    color: liked[flat.id] || productState[flat.id] ? '#ff4081' : 'rgba(255,255,255,0.8)',
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      color: '#ff4081',
                      transform: 'scale(1.2)',
                    }
                  }}
                >
                  <FavoriteIcon />
                </IconButton>
              </Box>

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="body2" color="text.secondary" sx={{
                  lineHeight: 1.6,
                  height: 80,
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                }}>
                  {flat.description}
                </Typography>
              </CardContent>

              <CardActions disableSpacing sx={{ padding: 2 }}>
                <Button
                  variant="contained"
                  component={Link}
                  href={`/flatDetails/${flat.id}`}
                  fullWidth
                  sx={{
                    bgcolor: '#43bcce',
                    color: 'white',
                    borderRadius: 2,
                    py: 1,
                    fontWeight: 600,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: '#3aa9ba',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 5px 15px rgba(67, 188, 206, 0.3)',
                    },
                    '& .MuiButton-endIcon': {
                      transition: 'transform 0.3s ease',
                    },
                    '&:hover .MuiButton-endIcon': {
                      transform: 'translateX(3px)',
                    }
                  }}
                  endIcon={<DetailsIcon sx={{ ml: 0.5 }} />}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}