import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import facebookIcon from "@/assets/landing_page/facebook.png";
import instagramIcon from "@/assets/landing_page/instagram.png";
import twitterIcon from "@/assets/landing_page/twitter.png";
import linkedIcon from "@/assets/landing_page/linkedin.png";
import assets from "@/assets";

const Footer = () => {
  return (
    <Box bgcolor="#43bcce" py={5}>
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Stack>
            <Typography color="white">New to sharing</Typography>
            <Typography
              component={Link}
              color="white"
              href="/"
              sx={{
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Why flat share?
            </Typography>
            <Typography
              component={Link}
              color="white"
              href="/"
              sx={{
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              The Rent a Room scheme
            </Typography>
            <Typography
              component={Link}
              color="white"
              href="/"
              sx={{
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Guide to taking in a lodger
            </Typography>
            <Typography
              component={Link}
              color="white"
              href="/"
              sx={{
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Landlords guide to renting by the room
            </Typography>
            <Typography
              component={Link}
              color="white"
              href="/"
              sx={{
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Shared Home Insurance
            </Typography>
            <Typography
              component={Link}
              color="white"
              href="/"
              sx={{
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Tenancy Agreements
            </Typography>
          </Stack>

          <Stack>
            <Typography color="white">Our services</Typography>
            <Typography
              component={Link}
              color="white"
              href="/"
              sx={{
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Advertise a room
            </Typography>
            <Typography
              component={Link}
              color="white"
              href="/"
              sx={{
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Post a room wanted ad
            </Typography>
            <Typography
              component={Link}
              color="white"
              href="/"
              sx={{
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Advertise a whole property
            </Typography>
            <Typography
              component={Link}
              color="white"
              href="/"
              sx={{
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Student Accommodation
            </Typography>
            <Typography
              component={Link}
              color="white"
              href="/"
              sx={{
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Monday to Friday lets
            </Typography>
          </Stack>
          <Stack>
            <Typography component="p" color="white">
              contact us
            </Typography>
            <Typography component="p" color="white">
              Mon to Fri: 9am _ 8.30pm
            </Typography>
            <Typography component="p" color="white">
              Weekends: 10am _ 7.30pm
            </Typography>
            <Typography component="p" color="white">
              Email:mmehedihasanjoyv@gmail.com
            </Typography>
            <Typography component="p" color="white">
              Phone:+8801601588531
            </Typography>
            <Typography component="p" color="white" ml={-14}>
              <Stack direction="row" gap={2} justifyContent="center" py={-2}>
                <Image
                  src={facebookIcon}
                  width={30}
                  height={30}
                  alt="facebook"
                />
                <Image
                  src={instagramIcon}
                  width={30}
                  height={30}
                  alt="facebook"
                />
                <Image
                  src={twitterIcon}
                  width={30}
                  height={30}
                  alt="facebook"
                />
                <Image src={linkedIcon} width={30} height={30} alt="facebook" />
              </Stack>
            </Typography>
          </Stack>
        </Box>

        {/* <div className="border-b-[1px] border-dashed"></div> */}
        <Box
          sx={{
            border: "1px dashed lightgray",
          }}
        ></Box>

        <Stack
          direction="row"
          gap={2}
          justifyContent="space-between"
          alignItems="center"
          py={3}
        >
          <Typography component="p" color="white">
            &copy;2024 Spare Room. All Rights Reserved.
          </Typography>
          <Typography component={Link} href="/" fontWeight={600} color="white">
            <Image src={assets.svgs.logo} alt="Logo" width={300} height={300} />
          </Typography>
          <Typography component={Link} color="white" href="/">
            Terms of Use, Privacy Policy, etc.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
