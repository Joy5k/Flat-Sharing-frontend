"use client"

import { Fullscreen } from "@mui/icons-material";
import { Box, Stack, styled, Typography } from "@mui/material";

const StyledInformationBox = styled(Box)(({ theme }) => ({
  background: "#f4f7fe",
  borderRadius: theme.spacing(1),
  width: "45%",
  padding: "8px 16px",
  "& p": {
    fontWeight: 600,
  },
}));

const profileInformation = ({ data }: any) => {
  return (
    <>
      <Typography variant="h5" color="primary.main" mb={2}>
        Personal Information
      </Typography>

      <Stack direction={{ xs: "column", md: "row" }} gap={2} flexWrap={"wrap"}>
       
        <StyledInformationBox>
          <Typography color="secondary" variant="caption">
            Name
          </Typography>
          <Typography>{data?.username}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography color="secondary" variant="caption">
            Email
          </Typography>
          <Typography>{data?.email}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography color="secondary" variant="caption">
            Role
          </Typography>
          <Typography>{data?.role}</Typography>
        </StyledInformationBox>
        
      </Stack>
      <div className="bg-[#F4F7FE] p-2 my-4">
          <Typography color="secondary" variant="caption">
            About
          </Typography>
          <Typography>
            Hello, I am Ariana, the admin of Spare Room. Whether you are looking to find the perfect flatmate or need a cozy space to call your own, I’m here to help make your search as smooth as possible. Our community is all about connecting people with the right places, and I am dedicated to ensuring that your experience on our platform is positive, safe, and straightforward. <br /> <br />
            If you have any questions, need assistance, or just want to chat about your search, feel free  to reach out. I am always here to help! <br />

            Happy room hunting! <br /> <br />

            Ariana <br />
            Admin, Spare Room
          </Typography>
        </div>

    </>
  );
};

export default profileInformation;
