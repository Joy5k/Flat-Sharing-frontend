"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { z } from "zod";
import KeyIcon from "@mui/icons-material/Key";
import { useChangePasswordMutation } from "@/redux/api/authApi";
import { toast } from "sonner";
import SPForm from "@/components/Forms/SPForm";
import SPInput from "@/components/Forms/SPInput";
import { useState } from "react";
import { logoutUser } from "@/services/actions/logoutUser";
import { useRouter } from "next/navigation";

const validationSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string().min(6, "Must be at least 6 characters long"),
  confirmPassword: z.string().min(6, "Must be at least 6 characters long"),
});

const ChangePassword = () => {
  const [error, setError] = useState<string>("");
  const [changePassword] = useChangePasswordMutation();
  const router = useRouter();
   const onSubmit = async (values: FieldValues) => {
      setError("");
    if (values.newPassword !== values.confirmPassword) {
      setError(
        "Passwords do not match. Please ensure both passwords are identical."
      );
    } else {
      setError("");
      try {
        const res = await changePassword(values);
        if ( res?.data?.message||res?.data?.success) {
          toast.success("Password Changed Successfully");
          logoutUser(router);
        } 
      } catch (error:any) {
        toast.success(error?.message||"Incorrect Old Password");
        console.log(error);
        setError(error?.message);
      }
    }
  };

  return (
    <Box
      sx={{
        px: 4,
        py: 2,
        maxWidth: 600,
        width: "100%",
        boxShadow: 1,
        borderRadius: 1,
        mx: "auto",
        mt: {
          xs: 2,
          md: 5,
        },
      }}
    >
      <Stack alignItems="center" justifyContent="center">
        <Box
          sx={{
            "& svg": {
              width: 100,
              height: 100,
            },
          }}
        >
          <KeyIcon sx={{ color: "primary.main" }} />
        </Box>
        <Typography variant="h5" fontWeight={600} sx={{ mb: 2, mt: -1.5 }}>
          Change password
        </Typography>
      </Stack>
      <SPForm
        onSubmit={onSubmit}
        defaultValues={{
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        resolver={zodResolver(validationSchema)}
      >
        <Grid>
          <Grid item xs={12} sm={12} md={6}>
            <SPInput
              name="oldPassword"
              type="password"
              label="Old Password"
              fullWidth
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <SPInput
              name="newPassword"
              type="password"
              label="New Password"
              fullWidth
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <SPInput
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              fullWidth
              sx={{ mb: 2 }}
            />
            {error && <Typography color="error">{error}</Typography>}
          </Grid>
        </Grid>

        <Button type="submit" sx={{ width: "100%", my: 2 }}>
          change Password
        </Button>
      </SPForm>
    </Box>
  );
};

export default ChangePassword;
