'use client';
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import assets from '@/assets';
import Link from 'next/link';
import { FieldValues} from 'react-hook-form';
import { userLogin } from '@/services/actions/userLogin';
import { setRefreshToken, storeUserInfo } from '@/services/auth.services';
import { toast } from 'sonner';
import SPForm from '@/components/Forms/SPForm';
import SPInput from '@/components/Forms/SPInput';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Spinner } from '@/utils/spinner';

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
            setRefreshToken(res?.data?.refreshToken);
            toast.success(res?.message);
            storeUserInfo({ accessToken: res?.data?.accessToken });
           
            setLoading(false)
         } else {
            setLoading(false)
            console.log(res,'auth error')
            setError(res?.error || 'An error occurred while logging in.');
         }
      } catch (err: any) {
         setLoading(false)
         console.log(err,'auth catch error')

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
                       <Typography component="p" color="white">{
                           loading ? <Button variant="contained" disabled>
                           <Spinner height="20px" width="20px" />
                           <Box sx={{ ml: 1 }}>Processing...</Box>
                         </Button> : 'Login'
                       } </Typography>}
                     </Button>
                     
                     <Typography component='p' fontWeight={300} >
                        Don&apos;t have an account? 
                        <Link href='/register' className='text-[#43BCCE] underline font-semibold ml-1' >Create an account</Link>
                     </Typography>
                     <div className='border shadow-xl p-3'>
                        <p className='my-3 text-xl font-mono font-semibold underline text-center text-sky-900'>Login As Admin</p>
                        <p className='text-lg font-mono font-semibold text-sky-700'>Email: ariana@gmail.com</p>
                        <p className='text-lg font-mono font-semibold text-sky-700'>Password: 123456</p>
                     </div>
                  </SPForm>
               </Box>
            </Box>
         </Stack>
      </Container>
   );
};

export default LoginPage;
