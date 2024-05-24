import React from 'react';
import { Grid, Card, CardMedia, Typography, Container,Box } from '@mui/material';

const FeaturedSection = () => {
  const featuredImages = [
    { id: 1, alt: 'Image 1', src: 'https://www.spareroom.co.uk/v2/img/logos/externalLogos/uk/theGuardian.svg?v=1' },
    { id: 3, alt: 'Image 3', src: 'https://www.spareroom.co.uk/v2/img/logos/externalLogos/uk/BBC.svg?v=1' },
    { id: 4, alt: 'Image 4', src: 'https://www.spareroom.co.uk/v2/img/logos/externalLogos/uk/metro.svg?v=1' },
    { id: 6, alt: 'Image 6', src: 'https://www.spareroom.co.uk/v2/img/logos/externalLogos/uk/timeOut.svg?v=1' },
  ];

  return (
    <Container>
       <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px 0",
      }}
    >
      <Typography 
        sx={{ 
          fontSize: { xs: "24px", md: "30px" }, 
          fontWeight: "600", 
          color: "primary.main", 
          marginTop: "50px" 
        }}
      >
       As featured by
      </Typography>
    </Box>
      <Grid container spacing={2} sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px 0",
        boxShadow: 'none' ,
      }}>
        {featuredImages.map((image) => (
          <Grid key={image.id} item xs={12} sm={6} md={4} lg={2}>
            <Card style={{ width: '200px',height:"100px", margin: '5px auto', boxShadow: 'none' , }}>
              <CardMedia
                component="img"
                alt={image.alt}
                style={{ width: '90%', height:"60%", }}
                image={image.src}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FeaturedSection;
