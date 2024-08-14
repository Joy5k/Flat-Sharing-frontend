"use client";

import {
  useGetMYProfileQuery,
  useUpdateMYProfileMutation,
} from "@/redux/api/myProfile";
import { Box, Button, Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Image from "next/image";
import React, { useState } from "react";
import AutoFileUploader from "@/components/Forms/AutoFileUploader";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ProfileUpdateModal from "./components/ProfileUpdateModal";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ProfileInformation from './components/ProfileInformation'; 
const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useGetMYProfileQuery({});
  const [updateMYProfile, { isLoading: updating }] =useUpdateMYProfileMutation();

  // const fileUploadHandler = (file: File) => {
    // const formData = new FormData();
    // formData.append("file", file);
    // formData.append("data", JSON.stringify({}));

    // updateMYProfile(formData);
  // };

  if (isLoading) {
    return   <h1 className='text-4xl text-clip h-full text-center text-sky-800 font-bold font-mono mt-32'>Loading...</h1>

  }
  if (!data) {
    return (
      <h1 className='text-4xl text-clip h-full text-center text-red-800 font-bold font-mono mt-32'>
        No profile data available.
      </h1>
    );
  }
  return (
    
    <Box>
    
    <ProfileUpdateModal open={isModalOpen} setOpen={setIsModalOpen} id={data?.id} user={data} updateUser={updateMYProfile} />
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          <Grid xs={12} md={4}>
            <Box
              sx={{
                height: 300,
                width: "100%",
                overflow: "hidden",
                borderRadius: 1,
              }}
            >
              <Image
                height={300}
                width={400}
                src={data?.profilePhoto||"https://protrainy.com/static/staticCourse/img/about-extra-1.svg"}
                alt="User Photo"
              />
            </Box>
            {/* <Box my={3}>
              {updating ? (
                <p>Uploading...</p>
              ) : (
                <AutoFileUploader
                  name="file"
                  label="Choose Your Profile Photo"
                  icon={<CloudUploadIcon />}
                  onFileUpload={fileUploadHandler}
                  variant="text"
                />
              )}
            </Box> */}

            <Button
              fullWidth
              endIcon={<ModeEditIcon />}
              onClick={() => setIsModalOpen(true)}
            >
              Edit Profile
            </Button>
          </Grid>
           <Grid xs={12} md={8}>
            <ProfileInformation data={data} />
          </Grid>
        </Grid>
      </Container>

    </Box>
  );
};

export default Profile;
