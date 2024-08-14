"use client"
import React, { useState } from 'react';
import { Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button, Grid, Checkbox, FormControlLabel, CircularProgress } from '@mui/material';
import { useGetSingleFlatQuery } from "@/redux/api/flatApi";
import { useGetSingleUserQuery } from "@/redux/api/userApi";
import { useFlatRequestPostMutation } from "@/redux/api/flatRequest";
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const FlatRequestPage = ({ params }: any) => {

  const router = useRouter();
  const { data: userData, isLoading: userLoading } = useGetSingleUserQuery({});
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const { data: flatData, isLoading: flatLoading, error } = useGetSingleFlatQuery(params.flatRequestId);
  const [flatRequestPost, { isLoading: flatRequestLoading }] = useFlatRequestPostMutation();

  const handlePostFlatRequest = async () => {
    const res = await flatRequestPost(params.flatRequestId);
   try {
  
    if (res?.data?.id) {
      router.push("/dashboard/profile/flatRequests");
    }
   } catch (error:any) {

    toast.error(error?.message||"something went wrong")
   }
  };

  if (userLoading || flatLoading) {
    return (
      <Typography sx={{
        height: "100vh",
        width: "100vw",
        margin: "0 auto",
        fontSize: "40px",
        fontWeight: "600",
        color: "primary.main",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        Loading...
      </Typography>
    );
  }

  const amenities = flatData?.amenities || [];

  return (
    <Box sx={{ maxWidth: "1000px", width: "100%", margin: "100px auto" }}>
      <Typography variant="h4" gutterBottom>
        Flat Share Request Form
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Your Name"
            value={userData?.username || ''}
            variant="outlined"
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Your Email"
            value={userData?.email || ''}
            variant="outlined"
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Your Phone"
            value={userData?.phone || '+088**********'}
            variant="outlined"
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Flat Location"
            value={flatData?.location || 'Dhaka, Bangladesh'}
            variant="outlined"
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Rent Amount"
            value={flatData?.rentAmount || '$'}
            variant="outlined"
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Bedrooms"
            value={flatData?.bedrooms || "1"}
            variant="outlined"
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel disabled>Amenities</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Amenities"
              disabled
            >
              {amenities.map((amenity: string) => (
                <MenuItem key={amenity} value={amenity} disabled>
                  {amenity}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Flat Details"
            value={flatData?.description || "Flat Description"}
            variant="outlined"
            multiline
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />}
            label="I agree to the terms and conditions"
          />
        </Grid>
        <Grid item xs={12}>
          <Button onClick={handlePostFlatRequest} fullWidth variant="contained" color="primary" disabled={!termsAccepted || userLoading}>
            {flatRequestLoading ? <CircularProgress color="secondary" /> : <Typography component="p" color="white">Submit Flat Request</Typography>}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FlatRequestPage;
