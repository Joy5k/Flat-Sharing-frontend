import React, { useState, useEffect } from "react";
import SPFullScreenModal from "@/components/Shared/SPModal/SPFullScreenModal";
import SPForm from "@/components/Forms/SPForm";
import { Button, Grid, TextField,Box } from "@mui/material";
import SPInput from "@/components/Forms/SPInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Autocomplete from "@mui/material/Autocomplete";


type FlatSchema = {
  location?: string;
  description?: string;
  rentAmount?: number;
  bedrooms?: number;
  amenities?: string[];
};
type FlatUpdateData = {
   flatId: string;
   flatData: any
}
type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
   flatId: string;
  flat?:any;
  updateFlat: (payload: Partial<FlatSchema>) => Promise<any>;
};

const validationSchema = z.object({
  location: z.string().optional(),
  description: z.string().optional(),
  rentAmount: z
    .number()
    .min(0, {
      message: "Rent amount must be greater than or equal to 0!",
    })
    .optional(),
  bedrooms: z
    .number()
    .int()
    .min(1, {
      message: "Bedrooms must be a positive integer!",
    })
    .optional(),
  amenities: z
    .array(z.string())
    .min(1, {
      message: "At least 1 amenity is required!",
    })
    .optional(),
});

const FlatUpdateModal = ({
  open,
  setOpen,
   flatId,
   flat,
  updateFlat,
}: TProps) => {
  const [updating, setUpdating] = useState(false);
  const [amenities,setAmenities]=useState<string[]>()

  const submitHandler = async (values: any) => {
   const bedroomsValues=Number(values.bedrooms)
   const rentAmountValues=Number(values.rentAmount)
    setUpdating(true);

    const payload = {
      ...values,
      rentAmount:rentAmountValues, 
      bedrooms: bedroomsValues, 
      amenities: amenities, 
    };
     
    
     setOpen(false);
     const flatUpdateData:any = {
        flatId:flatId,
        flatData:payload
     }
     console.log(flatUpdateData,"the flat updated data");
    const res = await updateFlat(flatUpdateData);
    if (res.data.id) {
      toast.success("Flat Updated");
    }
    setUpdating(false);
  };

  return (
    <Box>
      <SPFullScreenModal
        open={open}
        setOpen={setOpen}
        title="Update Flat"
        sx={{
          maxWidth: "600px",
          height: "100vh",
          margin: "0 auto",
        }}
      >
        <SPForm
          onSubmit={submitHandler}
          defaultValues={flat}
          resolver={zodResolver(validationSchema)}
        >
          <Grid container spacing={2} sx={{ my: 5 }}>
            <Grid item xs={12}>
              <SPInput
                name="location"
                label="Location"
                sx={{ mb: 2 }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
            <SPInput
                label="Description"
                fullWidth={true}
                name="description"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <SPInput
                label="Rent Amount"
                type="number"
                fullWidth={true}
                name="rentAmount"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <SPInput
                label="Bed Rooms"
                type="number"
                fullWidth={true}
                name="bedrooms"
              />
            </Grid>
            {/* <Grid item xs={12}>
              <SPInput
                name="amenities"
                label="Amenities (comma-separated)"
                sx={{ mb: 2 }}
                fullWidth
              />
            </Grid> */}
            <Grid item md={12}>
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
                    label="Amenities (space-separated)"
                    placeholder="Enter amenities"
                  />
                )}
              />
            </Grid>
                 
          </Grid>
          <Button type="submit" disabled={updating}>
            Save
          </Button>
        </SPForm>
      </SPFullScreenModal>
    </Box>
  );
};

export default FlatUpdateModal;