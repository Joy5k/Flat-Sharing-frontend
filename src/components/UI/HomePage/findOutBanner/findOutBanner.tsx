'use client';
import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import { keyframes } from '@emotion/react';

// Keyframe animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const scaleIn = keyframes`
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const FindOutBanner = () => {
  return (
    <Box
      id="tubead"
      sx={{
        textAlign: 'center',
        p: 6,
        background: 'linear-gradient(135deg, #43bcce 0%, #2ba1b3 100%)',
        position: 'relative',
        overflow: 'hidden',
        animation: `${float} 8s ease-in-out infinite`,
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        borderRadius: 3,
        mx: 'auto',
        my: 8,
        maxWidth: '90%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          padding: '40px 25px',
          fontFamily: 'monospace',
          flexDirection: {
            xs: 'column',
            sm: 'column',
            md: 'row',
            lg: 'row'
          },
          alignItems: 'center',
          color: '#fff',
          width: '80%',
          margin: 'auto',
        }}
      >
        <Box
          sx={{
            animation: `${fadeInUp} 1s ease-out`,
            textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            flex: 1,
            mr: 4
          }}
        >
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 'bold',
              fontSize: { xs: '1.8rem', md: '2.4rem' },
              lineHeight: 1.2,
              mb: 2
            }}
          >
            Earn Extra Cash From 
            <Box component="span" sx={{ color: '#ffef96', ml: 1.5 }}>
              Your Spare Room
            </Box>
          </Typography>
        </Box>

        <Link href="/findOut" passHref>
          <Button
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: '#ff6b6b',
              color: 'white',
              padding: '15px 40px',
              fontSize: '1.2rem',
              borderRadius: '50px',
              transition: 'all 0.3s ease',
              animation: `${scaleIn} 0.5s cubic-bezier(0.4, 0, 0.2, 1)`,
              '&:hover': {
                transform: 'translateY(-3px)',
                backgroundColor: '#ff5252',
                boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
              },
              '&:active': {
                transform: 'translateY(0)'
              }
            }}
          >
            Find Out More
            <Box 
              component="span" 
              sx={{
                ml: 2,
                display: 'inline-block',
                transition: 'transform 0.3s ease'
              }}
            >
              →
            </Box>
          </Button>
        </Link>
      </Box>

      {/* Animated decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.1)',
          animation: `${float} 6s ease-in-out infinite`
        }}
      />
    </Box>
  );
};

export default FindOutBanner;