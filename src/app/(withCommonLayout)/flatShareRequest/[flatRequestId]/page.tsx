"use client";
import React, {useState } from 'react';
import { Box, Typography, TextField, FormControl,InputLabel, Select, MenuItem,Button, Grid, Checkbox, FormControlLabel } from '@mui/material';
import { useGetSingleFlatQuery } from "@/redux/api/flatApi";
import { useGetSingleUserQuery } from "@/redux/api/userApi";

const FlatRequestPage = ({ params }: any) => {
  const { data: userData, isLoading:userLoading } = useGetSingleUserQuery({});
  const [additionalInfo, setAdditionalInfo] = useState<string>('');
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const { data:flatData, isLoading:flatLoading, error } = useGetSingleFlatQuery(params.flatRequestId);
console.log({flatData},params)
  const handlePostFlatRequest = async () => {

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
        <Grid item xs={6}>
          <TextField
            label="Your Name"
            value={userData?.username || ''}
            variant="outlined"
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Your Email"
            value={userData?.email || ''}
            variant="outlined"
            fullWidth
            disabled
          />
        </Grid>
        
        <Grid item xs={6}>
          <TextField
            label="Your Phone"
            value={userData?.phone || '+088**********'}
            variant="outlined"
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Flat Location"
            value={flatData?.location || 'Dhaka,Bangladesh'}
            variant="outlined"
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Rent Ammount"
            value={flatData?.rentAmount || '$'}
            variant="outlined"
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Bed Rooms"
            value={flatData?.bedrooms||"1"}
            variant="outlined"
            disabled
            fullWidth
          />
        </Grid>
        
        <Grid item xs={6}>
        <FormControl fullWidth>
  <InputLabel disabled>{amenities[0]}</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Amenities"
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
            value={flatData?.description||"Flat Description"}
            variant="outlined"
            disabled
            multiline
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />}
            label="I agree to the terms and conditions"
          />
        </Grid>
        <Grid item xs={12}>
          <Button onClick={handlePostFlatRequest} variant="contained" color="primary" disabled={!termsAccepted||userLoading}>
            Submit Flat Request
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FlatRequestPage;
