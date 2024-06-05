"use client";

import { logoutUser } from "@/services/actions/logoutUser";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import assets from "@/assets";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import { useState,useEffect } from "react";
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import {isLoggedIn } from "@/services/auth.services";
import { authKey } from '@/contants/authkey';

const Navbar = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const[userExists,setUserExists]=useState<boolean>(false)
  const isTrue = isLoggedIn()
  const router = useRouter();

  useEffect(() => {
    if (isTrue) {
      return setUserExists(isTrue);
    }
  },[isTrue])
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleLogOut = () => {
    logoutUser(router)
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
      }}
    >
      <Container>
        <Stack
          py={2}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Image src={assets.svgs.logo} alt="Logo" width={150} height={150} />
          </Box>
          <Stack direction="row" justifyContent="space-between" gap={4}>
            <Typography
              component={Link}
              mt={1}
              href="/"
              color="#005480"
              fontWeight="semi-bold"
            >
              Home
            </Typography>
            <Typography
              component={Link}
              mt={1}
              href="/about"
              color="#005480"
              fontWeight="semi-bold"
            >
              About us
            </Typography>
            <Typography
              component={Link}
              mt={1}
              href="/"
              color="#005480"
              fontWeight="semi-bold"
            >
              Contact us
            </Typography>
          </Stack>

          {userExists ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" component={Link} href="/dashboard/profile"  >
                <PersonIcon/>    Profile
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center" component={Link} href="/dashboard" >
                <DashboardIcon />  Dashboard
                  </Typography>
                </MenuItem>

                <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center" color="orange"  onClick={handleLogOut}>
                   <LogoutIcon/> Logout
                  </Typography>
                       </MenuItem>      
              </Menu>
            </Box>
          ) : (
            <Button component={Link} href="/login" suppressHydrationWarning>
              Login
            </Button>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default Navbar;
