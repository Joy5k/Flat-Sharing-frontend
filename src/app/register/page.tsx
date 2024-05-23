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
import Image from "next/image";
import assets from "@/assets";
import Link from "next/link";
import { FieldValues } from "react-hook-form";
import { modifyPayload } from "@/utils/modifyPayload";
import { registerUser } from "@/services/actions/registerUser";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.services";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SPForm from "@/components/Forms/SPForm";
import SPInput from "@/components/Forms/SPInput";
import CircularProgress from '@mui/material/CircularProgress';


export const userValidationSchema = z.object({
  username: z.string().min(1, "Please enter your name!"),
  email: z.string().email("Please enter a valid email address!"),
 
});

export const validationSchema = z.object({
  password: z.string().min(6, "Must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Must be at least 6 characters"),
  user: userValidationSchema,
});

export const defaultValues = {
  password: "",
  user: {
    username: "",
    email: "",
  },
};

const RegisterPage = () => {
  const router = useRouter();
  const [loading,setLoading]=useState<boolean>(false)
  const [error, setError] = useState<string>("");
  const handleRegister = async (values: FieldValues) => {
    setLoading(false)
    if (values.password !== values.confirmPassword) {
      setError(
        "Passwords do not match. Please ensure both passwords are identical."
      );
      // const data = modifyPayload(values);
   const {confirmPassword,...registerData}=values
      try {
        setLoading(true)
        const res = await registerUser(registerData);
        console.log(res);
        if (res?.data?.id) {
          toast.success(res?.message);
          const result = await userLogin({
            password: values.password,
            email: values.user.email,
          });
          if (result?.data?.accessToken) {
            storeUserInfo({ accessToken: result?.data?.accessToken });
            router.push("/");
          }
        }
        setLoading(false)
      } catch (err: any) {
        console.error(err.message);
        setLoading(false)
      }
    };
  }
    return (
      <Container>
        <Stack
          sx={{
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              maxWidth: 600,
              width: "100%",
              boxShadow: 1,
              borderRadius: 1,
              p: 4,
              textAlign: "center",
            }}
          >
            <Stack
              sx={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box>
                <Image src={assets.svgs.logo} width={200} height={200} alt="logo" />
              </Box>
              <Box>
                <Typography variant='h4' fontWeight={600} color="primary">
                  Register
                </Typography>
              </Box>
            </Stack>

            <Box>
              <SPForm
                onSubmit={handleRegister}
                resolver={zodResolver(validationSchema)}
                defaultValues={defaultValues}
              >
                <Grid container spacing={2} my={1} >
                  <Grid item md={6}>
                    <SPInput label="Name" fullWidth={true} name="user.username" />
                  </Grid>
                  <Grid item md={6}>
                    <SPInput
                      label="Email"
                      type="email"
                      fullWidth={true}
                      name="user.email"
                    />
                  </Grid>
                  <Grid item md={6}>
                    <SPInput
                      label="Choose Password"
                      type="password"
                      fullWidth={true}
                      name="password"
                    />
                  </Grid>
                  <Grid item md={6}>
                    <SPInput
                      label="Confirm Password"
                      type="password"
                      fullWidth={true}
                      name="confirmPassword"
                    />
                  </Grid>
                    {error && <Typography ml={2} color="error">{error}</Typography>}
                
                </Grid>
                <Button
              
                  sx={{
                    margin: "10px 0px",
                  }}
                  fullWidth={true}
                  type="submit"
                >{loading ? <CircularProgress color="secondary" />:
                <Typography component="p" color="white"> Register</Typography>
                 
                }
                </Button>
                <Typography component="p" fontWeight={300}>
                  Do you already have an account? <Link href="/login">Login</Link>
                </Typography>
              </SPForm>
            </Box>
          </Box>
        </Stack>
      </Container>
    );
  
  }
export default RegisterPage;
