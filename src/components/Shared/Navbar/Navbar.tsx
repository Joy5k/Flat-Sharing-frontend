'use client';

import useUserInfo from '@/hooks/useUserInfo';
import { logoutUser } from '@/services/actions/logoutUser';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import assets from "@/assets";
const Navbar = () => {
   const userInfo = useUserInfo();
   const router = useRouter();

   const handleLogOut = () => {
      logoutUser(router);
   };

   return (
      <Box
         sx={{
            bgcolor: 'primary.main',
         }}
      >
         <Container>
            <Stack
               py={2}
               direction='row'
               justifyContent='space-between'
               alignItems='center'
            >
               <Box>
                  <Image src={assets.svgs.logo} alt="Logo" width={250} height={250} />
             </Box>
               <Stack direction='row' justifyContent='space-between' gap={4}>
                  <Typography
                     component={Link}
                     mt={1}
                     href='/'
                     color='#ffffff'
                  >
                     Home
                  </Typography>
                  <Typography
                     component={Link}
                     mt={1}
                     href='/'
                     color='#ffffff'
                  >
                     About us
                  </Typography>
                 
               </Stack>

               {userInfo?.userId ? (
                 <Typography
                 component={Link}
                
                 href='/dashboard'
                 color='#ffffff'
              >
                 My Profile
              </Typography>
               ) : (
                  <Button component={Link} href='/login'>
                     Login
                  </Button>
               )}
            </Stack>
         </Container>
      </Box>
   );
};

export default Navbar;
