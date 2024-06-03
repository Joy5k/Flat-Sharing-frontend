'use client';
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import assets from '@/assets';
import Link from 'next/link';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { userLogin } from '@/services/actions/userLogin';
import { storeUserInfo } from '@/services/auth.services';
import { toast } from 'sonner';
import SPForm from '@/components/Forms/SPForm';
import SPInput from '@/components/Forms/SPInput';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

 const validationSchema = z.object({
   email: z.string().email('Please enter a valid email address!'),
   password: z.string().min(6, 'Must be at least 6 characters'),
});

const LoginPage = () => {
   const [error, setError] = useState('');
const [loading,setLoading]=useState(false)
   const handleLogin = async (values: FieldValues) => {
   
      try {
         setLoading(true)
         const res = await userLogin(values);
         if (res?.data?.accessToken) {
            toast.success(res?.message);
            storeUserInfo({ accessToken: res?.data?.accessToken });
            setLoading(false)
         } else {
            setLoading(false)
            setError(res?.message || 'An error occurred while logging in.');
         }
      } catch (err: any) {
         console.error(err);
         setLoading(false)
         setError('An error occurred while logging in.');
      }
   };

   return (
      <Container>
         <Stack
            sx={{
               height: '100vh',
               justifyContent: 'center',
               alignItems: 'center',
            }}
         >
            <Box
               sx={{
                  maxWidth: 600,
                  width: '100%',
                  boxShadow: 1,
                  borderRadius: 1,
                  p: 4,
                  textAlign: 'center',
               }}
            >
               <Stack
                  sx={{
                     justifyContent: 'center',
                     alignItems: 'center',
                  }}
               >
                  <Box   >
                     <Image
                        src={assets.svgs.logo}
                        width={200}
                        height={200}
                      
                        alt='logo'
                     />
                  </Box>
                  <Box>
                     <Typography variant='h4' fontWeight={600} color="primary">
                        Login 
                     </Typography>
                  </Box>
               </Stack>

          

               <Box>
                  <SPForm
                     onSubmit={handleLogin}
                     resolver={zodResolver(validationSchema)}
                     defaultValues={{
                        email: '',
                        password: '',
                     }}
                  >
                     <Grid container spacing={2} my={1}>
                        <Grid item md={6}>
                           <SPInput
                              name='email'
                              label='Email'
                              type='email'
                              fullWidth={true}
                           />
                        </Grid>
                        <Grid item md={6}>
                           <SPInput
                              name='password'
                              label='Password'
                              type='password'
                              fullWidth={true}
                           />
                        </Grid>
                     </Grid>
                     {error && (
                  <Box>
                     <Typography
                        sx={{
                        
                           color: 'red',
                           marginTop: '5px',
                        }}
                     >
                        {error}
                     </Typography>
                  </Box>
               )}
                     <Link href={'/forgot-password'}>
                        <Typography
                           mb={1}
                           textAlign='end'
                           component='p'
                           fontWeight={300}
                           sx={{
                              textDecoration: 'underline',
                           }}
                        >
                           Forgot Password?
                        </Typography>
                     </Link>

              

                     <Button
                        sx={{
                           margin: '10px 0px',
                        }}
                        fullWidth={true}
                        type='submit'
                     >
                        {loading ? <CircularProgress color="secondary" />:
                       <Typography component="p" color="white"> Login</Typography>}
                     </Button>
                     <Typography component='p' fontWeight={300}>
                        Don&apos;t have an account?{' '}
                        <Link href='/register'>Create an account</Link>
                     </Typography>
                  </SPForm>
               </Box>
            </Box>
         </Stack>
      </Container>
   );
};

export default LoginPage;
