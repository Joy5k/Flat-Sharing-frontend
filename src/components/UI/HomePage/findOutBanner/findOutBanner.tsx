
import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';

const FindOutBanner= () => {
  return (
    <Box
      id="tubead"
      sx={{
        // Add styles as needed for your section
        textAlign: 'center',
        p: 4,
      }}
    >
      <Link href="/findOut" passHref>
        <Box
          sx={{
            textDecoration: 'none', // Remove underline from link
            display: 'flex',
            justifyContent:"space-evenly",
            padding:'40px 25px',
            fontFamily:"monospace",
            flexDirection: {
              xs: 'column',  // On extra small screens, use column layout
              sm: 'column',
              md:"row",
              lg:"row"
              
      // On small screens and up, use row layout
            },
            alignItems: 'center',
            // background:"#B3D9CF",
            backgroundImage:"url('https://scontent.fdac96-2.fna.fbcdn.net/v/t39.30808-6/314896497_563486205780825_3367472903724285009_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFWxytViPftas0TyNOhuY9OyXMA_Q0zenvJcwD9DTN6e2ekBlJsUQC0pZrE8gPbehfsKv05qNHeHvhbD8gf90-u&_nc_ohc=fLBaKepmFc8Q7kNvgEGlnLA&_nc_zt=23&_nc_ht=scontent.fdac96-2.fna&oh=00_AYBWKA2yGPy942hsy58t4CoM8iJKDP3R6j0i2cqhuAy5JQ&oe=66C18B27')",
            color:'#fff',
            width:'80%',
            margin:"auto"
          }}
        
        >
          <Box
            sx={{
              display: 'flex',
        flexDirection: {
          xs: 'column',  // On extra small screens, use column layout
          sm: 'column',
          md:"row",
          lg:"row"
          
  // On small screens and up, use row layout
        },
        alignItems: 'center',
            }}
          >
  
            <Typography variant="h6" sx={{ mt: 2 }}>
              Earn extra cash from 
              your spare room
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Find out more
          </Button>
        </Box>
      </Link>
    </Box>
  );
};

export default FindOutBanner;
