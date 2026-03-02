import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Stack, Typography, Box, Divider, Menu, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ProfileSection from 'layout/MainLayout/Header/ProfileSection';
import { useNavigate } from 'react-router-dom';
import { userMe } from 'container/LoginContainer/slice';

const stringAvatar = (name) => ({
  sx: {
    bgcolor: '#ffffff54',
    width: 40,
    height: 40,
    fontSize: '17px',
    fontWeight: 500,
    color: '#FFFFFF',
    cursor: 'pointer'
  },
  children: name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : 'U'
});

export default function BackgroundLetterAvatars() {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
  const user = useSelector((state) => state?.login?.userData || []);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userMe());
  }, [dispatch]);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Extract user info
  const name = user?.vendorName 
  const email = user?.vendorEmail
  const phone = user?.vendorMobile || 'N/A';

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
        sx={{
          borderRadius: 2,
          width: '100%'
        }}
      >
        {/* Left side: empty or title */}
        <Typography sx={{ color: '#fff', fontWeight: 300 }}>{}</Typography>

        {/* Right side: Avatar + Info + Dropdown */}
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar onClick={()=>{
            handleClose();
            navigate("profile")
          }}  sx={{ cursor: 'pointer' }}/>

          <Box sx={{ ml: 1 }}>
            <Typography variant="body1" sx={{ color: 'white', fontWeight: 500 }}>
              {name}
            </Typography>
          </Box>

          <Box sx={{ ml: 1 }}>
            <ProfileSection />
          </Box>
        </Stack>
      </Stack>

      {/* Profile Info Dropdown */}
      
    </>
  );
}
