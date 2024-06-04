"use client";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Autocomplete from "@mui/material/Autocomplete";
import SPInput from "@/components/Forms/SPInput";
import SpInputNumber from "@/components/Forms/SpInputNumber";
import SPForm from "@/components/Forms/SPForm";
import { FieldValues } from "react-hook-form";
import uploadImage from "@/components/ImageUploader/ImageUploader";
import { useFlatPostMutation } from "@/redux/api/flatApi";
import { useRouter } from "next/navigation";

const createFlatSchema = z.object({
  location: z.string({
    required_error: "location is required!",
  }),
  description: z.string({
    required_error: "Description is required!",
  }),
  rentAmount: z.preprocess(
    (val) => typeof val === 'string' ? parseFloat(val) : val,
    z.number().min(0, { message: "Rent amount must be greater than or equal to 0!" })
  ),
  bedrooms: z.preprocess(
    (val) => typeof val === 'string' ? parseInt(val, 10) : val,
    z.number().min(1, { message: "Bedrooms must be a positive integer!" })
  ),
  amenities: z.array(
    z.string({
      required_error: "Minimum 1 amenities is required!",
    })
  ),
  photos: z
    .array(
      z
        .string({
          required_error: "Multiples Photos are needed!",
        })
        .url()
    )
    .optional(),
});

type FlatFormValues = z.infer<typeof createFlatSchema>;

 const defaultFlatValues: FlatFormValues = {
  location: "",
  description: "",
  rentAmount:1000,
  bedrooms:2,
  amenities: [],
  photos: [],
};

const PostFlat = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [amenities, setAmenities] = useState<string[]>([]);
  const [photos, setPhotos] = useState<{ imageUrl: string }[]>([]);
  const [imageLoading,setImageLoading]=useState<boolean>(true)
  const [postFlat, { isLoading }] = useFlatPostMutation();
  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) {
      console.log("No files selected");
      return;
    }
  
try {
  const uploadedPhotos: { imageUrl: string }[] = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const response = await uploadImage(file);
      if (response) {
        uploadedPhotos.push({ imageUrl: response.imageUrl });
        setImageLoading(false)
      } else {
        console.log(`Failed to upload file: ${file.name}`);
      }
    }
  setPhotos(uploadedPhotos);
  setImageLoading(false)
} catch (error) {
  console.error(error,"comes from flat post");
}

    

  };
  

  const handleFlatPost = async (values: FieldValues) => {
    values.rentAmount = Number(values?.rentAmount);
    values.bedrooms = Number(values?.bedrooms);
    const res = await postFlat({ ...values, amenities, photos });
    if (res?.data?.id) {
      router.push("/dashboard/profile/flatPosts");
    }
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
              <SPInput
                label="Location"
                fullWidth={true}
                name="location"
                required
              />
            </Grid>

            <Grid item md={6}>
              <SPInput
                label="Description"
                fullWidth={true}
                name="description"
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
            <SpInputNumber
                label="Rent Amount"
                fullWidth={true}
                name="rentAmount"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <SpInputNumber
                label="Bed Rooms"
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
              <Input
                type="file"
                inputProps={{ multiple: true }}
                onChange={handleImageChange}
                required
              />
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
            disabled={imageLoading} 
          >
            { isLoading  ? (
              <CircularProgress color={"success"} />
            ) : (
              <Typography component="p" color="white" >
                Share Flat
              </Typography>
            )}
          </Button>
        </SPForm>
      </Box>
    </Box>
  );
};

export default PostFlat;
