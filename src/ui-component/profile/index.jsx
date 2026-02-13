import React from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  Avatar,
  TextField,
  Divider,
} from "@mui/material";

const Profile = () => {
  return (
    <Box sx={{ p: 4, backgroundColor: "#0b0f14", minHeight: "100vh" }}>
      {/* Header */}
      <Typography
        variant="h5"
        sx={{ color: "#fff", mb: 3, fontWeight: 600 }}
      >
        👤 Profile
      </Typography>

      <Paper
        sx={{
          p: 3,
          backgroundColor: "#121821",
          borderRadius: 2,
          boxShadow: "0 0 0 1px #1e2633",
        }}
      >
        {/* Personal Information */}
        <Typography
          sx={{ color: "#fff", fontWeight: 600, mb: 2 }}
        >
          Personal Information
        </Typography>

        <Box sx={{ display: "flex", gap: 4, mb: 3 }}>
          {/* Avatar */}
          <Box sx={{ textAlign: "center" }}>
            <Avatar
              sx={{
                width: 90,
                height: 90,
                mb: 1,
                backgroundColor: "#1e2633",
              }}
            />
            <Typography
              sx={{ color: "#ff9f1c", fontSize: 13, cursor: "pointer" }}
            >
              Update New Image
            </Typography>
          </Box>

          {/* Form */}
          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              label="Full Name"
              defaultValue="Abhi"
              margin="dense"
            />
            <TextField
              fullWidth
              label="Email Address"
              defaultValue="abhi@eventora.com"
              margin="dense"
            />
            <TextField
              fullWidth
              label="Phone Number"
              defaultValue="+91 123 456 7890"
              margin="dense"
            />

            <Button
              sx={{
                mt: 2,
                background: "linear-gradient(90deg, #ff7a18, #ff9f1c)",
                color: "#fff",
                px: 3,
                "&:hover": { opacity: 0.9 },
              }}
            >
              Update Profile
            </Button>
          </Box>
        </Box>

        <Divider sx={{ borderColor: "#1e2633", my: 3 }} />

        {/* Change Password */}
        <Typography
          sx={{ color: "#fff", fontWeight: 600, mb: 2 }}
        >
          Change Password
        </Typography>

        <Box sx={{ maxWidth: 400 }}>
          <TextField
            fullWidth
            label="Current Password"
            type="password"
            margin="dense"
          />
          <TextField
            fullWidth
            label="New Password"
            type="password"
            margin="dense"
          />
          <TextField
            fullWidth
            label="Confirm New Password"
            type="password"
            margin="dense"
          />

          <Button
            sx={{
              mt: 2,
              background: "#1e2633",
              color: "#ff9f1c",
              border: "1px solid #ff9f1c",
              px: 3,
              "&:hover": {
                backgroundColor: "rgba(255,159,28,0.1)",
              },
            }}
          >
            Update Password
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile;
