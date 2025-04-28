import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import assets from '@/assets'
import { Box } from '@mui/material';


const cardData = [
    {
      title: "We're all about people ",
      description: "Everyone's idea of the perfect housemate is different, so search based on what's important to you.",
      image: "https://www.spareroom.co.uk/v2/img/brand_icons/Welcome.svg?v=1",
      alt: "green iguana"
    },
    {
      title: "Safety",
      description: "Your safety is our top priority. We have a team of moderators working 7 days a week to check ads and content.",
      image: "https://www.spareroom.co.uk/v2/img/brand_icons/Keys.svg?v=1",
      alt: "green iguana"
    },
    {
      title: "We're the busiest",
      description: "Every 3 minutes someone finds a flatmate on SpareRoom. With the biggest selection of ads, you'll find yours.",
      image:"https://www.spareroom.co.uk/v2/img/brand_icons/EveryThreeMins.svg?v=1",
      alt: "green iguana"
    },
  ];

export default function AboutCard() {
  return (
    <Box 
    sx={{ 
      display: 'flex', 
      flexDirection: { xs: 'column', md: 'row' }, 
      justifyContent: 'space-around', 
      alignItems: 'center', 
      gap: 2, 
      padding: 2 ,
      boxShadow: 'none' ,
    }}
  >
    
    {cardData.map((card, index) => (
      <Card key={index} sx={{ maxWidth: 345,boxShadow: 'none' , }}>
      <Box sx={{ backgroundColor: '#fff' }}>
  <CardMedia
    component="img"

    alt={card.alt}
    style={{ maxWidth: '200px', maxHeight: '200px', width: 'auto', height: 'auto' ,margin:'0 auto', }}
    image={card.image}
    sx={{ backgroundColor: '#fff' }}
  />
</Box>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" textAlign="center">
            {card.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            {card.description}
          </Typography>
        </CardContent>
      </Card>
    ))}
  </Box>
  );
}
