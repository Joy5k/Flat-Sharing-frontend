"use client";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Autocomplete from "@mui/material/Autocomplete";
import SPFileUploader from "@/components/Forms/SPFileUploader";
import SPInput from "@/components/Forms/SPInput";
import SPForm from "@/components/Forms/SPForm";

const createFlatSchema = z.object({
  location: z.string({
    required_error: "location is required!",
  }),
  description: z.string({
    required_error: "Description is required!",
  }),
  rentAmount: z.number({
    required_error: "Rent is required!",
  }),
  bedrooms: z.number({
    required_error: "Bedrooms is required!",
  }),
  amenities: z.array(
    z.string({
      required_error: "Minimum 1 amenities is required!",
    })
  ),
  photos: z
    .array(
      z
        .string({
          required_error: "Multiples Photos is need!",
        })
        .url()
    )
    .optional(),
});

export const defaultFlatValues = {
  location: "",
  description: "",
  rentAmount:1000 ,
  bedrooms:2 ,
  amenities: [],
  photos: [],
};
const PostFlat = () => {
  const [error, setError] = useState<string>("");
  const [amenities, setAmenities] = useState<string[]>([]);

  
  const handleFlatPost = (values: FieldValues) => {
    console.log({...values,amenities})

  };
  return (
    <Box>
      <h3>This is flat post page</h3>
      <Box>
        <SPForm
          onSubmit={handleFlatPost}
          // resolver={zodResolver(createFlatSchema)}
           defaultValues={defaultFlatValues}
        >
          <Grid container spacing={2} my={1}>

            <Grid item md={6}>
              <SPInput label="Location" fullWidth={true} name="location" 
             
             />
            </Grid>

            <Grid item md={6}>
              <SPInput
                label="Description"
               
                fullWidth={true}
                name="description"
                
              />
            </Grid>

            <Grid item md={6}>
            <SPInput
  label="Rent Amount"
  type="number"
  fullWidth={true}
 
  name="rentAmount"
 
/>
            </Grid>

            <Grid item md={6}>
              <SPInput
                label="Bed Rooms"
               type="number"
               
                fullWidth={true}
                name="bedrooms"
              
              />
            </Grid>
            <Grid item md={6}>
              <Autocomplete
                multiple
                freeSolo
                options={[]}
                value={amenities}
                onChange={(event, newValue) => {
                  setAmenities(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Amenities"
                    placeholder="Enter amenities"
                  />
                )}
              />
            </Grid>
            <Grid item md={6}>
              <SPFileUploader label="Flat Photos" name="photo" />
            </Grid>
            {error && (
              <Typography ml={2} color="error">
                {error}
              </Typography>
            )}
          </Grid>
          <Button
            sx={{
              margin: "10px 0px",
            }}
            fullWidth={true}
            type="submit"
          >
            <Typography component="p" color="white">
              Share Flat
            </Typography>
          </Button>
        </SPForm>
      </Box>
    </Box>
  );
};

export default PostFlat;