import { Box, Button, Container, Typography } from "@mui/material";
import assets from "@/assets"; // Ensure this import path is correct

const HeroSection = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundImage: `url("https://www.spareroom.co.uk/v2/img/spareroom/landingpages/heroes/home_hero/966w.webp?v=1")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box 
        sx={{ 
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)"
        }} 
      />
      <Box   sx={{ zIndex: 1, textAlign: "center", color: "white",margin:"100px 0",
       }}>
       
        <Typography
          variant="h2"
          component="h1"
          fontWeight={500}
          color="white"
          mt="5"
        >
        The International Flatshare Site
        </Typography>
        <Typography
         color="white"
         sx={{margin:"20px"}}
        >
       85,953 rooms to rent and flatmates available now
        </Typography>
       
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", }}>
          <Button href="/dashboard/user/postFlat">Share Your Flat</Button>
  
        </Box>
      </Box>
    </Container>
  );
};

export default HeroSection;
