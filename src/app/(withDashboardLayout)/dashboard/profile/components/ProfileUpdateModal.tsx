"use client"
import React, { useState } from 'react';
import PHFullScreenModal from '@/components/Shared/SPModal/SPFullScreenModal';
import PHForm from '@/components/Forms/SPForm';
import { Button, Grid,Box } from '@mui/material';
import SPInput from '@/components/Forms/SPInput';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { logoutUser } from "@/services/actions/logoutUser";
import { useRouter } from "next/navigation";

type TProps = {
   open: boolean;
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
   id: string;
   user: any; // Pass the user object to the modal
   updateUser: ( payload: any) => void; // Function to update user details
};

const validationSchema = z.object({
   username: z.string().optional(),
   email: z.string().email().optional(),
});

const ProfileUpdateModal = ({ open, setOpen, id, user, updateUser }: TProps) => {
   const [updating, setUpdating] = useState(false);
   const router = useRouter();

   const submitHandler = async (values: any) => {
      setUpdating(true);
      const payload = {
         ...values,
         email: values.email.trim(), // Trim whitespace from email
      };
      setUpdating(false);
      setOpen(false);
    const res:any=  updateUser(payload);
   if(res?.data?.id){
      toast.success("Profile Updated");
      logoutUser(router);
   }
   };

   return (
      <Box  >
        <PHFullScreenModal open={open} setOpen={setOpen} title='Update Profile' sx={{
        maxWidth: "600px",
        height: "100vh",
        margin:"0 auto"
    }}>
         <PHForm
            onSubmit={submitHandler}
            defaultValues={user}
            resolver={zodResolver(validationSchema)}
         >
            <Grid container spacing={2} sx={{ my: 5 }}>
               <Grid item xs={12} sm={12} md={6}>
                  <SPInput
                     name='username'
                     label='Username'
                     sx={{ mb: 2 }}
                     fullWidth
                  />
               </Grid>
               <Grid item xs={12} sm={12} md={6}>
                  <SPInput
                     name='email'
                     type='email'
                     label='Email'
                     sx={{ mb: 2 }}
                     fullWidth
                  />
               </Grid>
            </Grid>
            <Button type='submit' disabled={updating}>
               Save
            </Button>
         </PHForm>
      </PHFullScreenModal>
      </Box>
   );
};

export default ProfileUpdateModal;
