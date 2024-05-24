import AboutCard from "@/components/UI/HomePage/AboutCard/AboutCard";
import {
    Box,
    Typography,
  } from "@mui/material";

const AboutPage = () => {
    return (
        <Box>
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
          fontWeight: "400", 
          color: "primary.main", 
          marginTop: "50px" 
        }}
      >
       Why use SpareRoom?
      </Typography>
    </Box>
           <AboutCard/>

        </Box>
    );
};

export default AboutPage;