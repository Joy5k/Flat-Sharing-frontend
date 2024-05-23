"use client";

import useUserInfo from "@/hooks/useUserInfo";
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
import { useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const userInfo = useUserInfo();
  const router = useRouter();
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleLogOut = () => {
    logoutUser(router);
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
            <Image src={assets.svgs.logo} alt="Logo" width={250} height={250} />
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
              href="/"
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

          {userInfo?.userId ? (
    
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
                  <Typography textAlign="center" component={Link} href="/"  >
                <PersonIcon/>    Profile
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center" component={Link} href="/" >
                <DashboardIcon />  Dashboard
                  </Typography>
                </MenuItem>

                <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center" color="orange"  onSubmit={handleLogOut}>
                   <LogoutIcon/> Logout
                  </Typography>
                       </MenuItem>
                       
              </Menu>
            </Box>
          ) : (
            <Button component={Link} href="/login">
              Login
            </Button>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default Navbar;
