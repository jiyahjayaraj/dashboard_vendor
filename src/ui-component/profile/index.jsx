import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Button,
  Paper,
  Avatar,
  TextField,
  Divider
} from "@mui/material";

import { userMe, updateProfile } from "container/LoginContainer/slice";

const Profile = () => {
  const dispatch = useDispatch();

  const vendor = useSelector(
    (state) => state?.login?.userData || {}
  );

  const [formData, setFormData] = useState({
    vendorName: "",
    vendorEmail: "",
    vendorMobile: "",
    companyName: "",
    companyAddress: "",
    city: "",
    state: "",
    pincode: ""
  });

  useEffect(() => {
    dispatch(userMe());
  }, [dispatch]);

  // Populate form when API data loads
  useEffect(() => {
    setFormData({
      vendorName: vendor?.vendorName || "",
      vendorEmail: vendor?.vendorEmail || "",
      vendorMobile: vendor?.vendorMobile || "",
      companyName: vendor?.companyName || "",
      companyAddress: vendor?.companyAddress || "",
      city: vendor?.city || "",
      state: vendor?.state || "",
      pincode: vendor?.pincode || ""
    });
  }, [vendor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = () => {
    dispatch(updateProfile(formData));
  };

  return (
    <Box sx={{ p: 4, background: "#0b0f14", minHeight: "100vh" }}>
      <Paper
        sx={{
          p: 3,
          background: "#121821",
          borderRadius: 2,
          boxShadow: "0 0 0 1px #1e2633"
        }}
      >
        <Box sx={{ display: "flex", gap: 4 }}>
          <Box sx={{ textAlign: "center" }}>
            <Avatar
              sx={{
                width: 90,
                height: 90,
                mb: 1,
                background: "#1e2633"
              }}
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <TextField fullWidth label="Name" name="vendorName" value={formData.vendorName} onChange={handleChange} margin="dense" />
            <TextField fullWidth label="Email" name="vendorEmail" value={formData.vendorEmail} onChange={handleChange} margin="dense" />
            <TextField fullWidth label="Mobile" name="vendorMobile" value={formData.vendorMobile} onChange={handleChange} margin="dense" />
            <TextField fullWidth label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} margin="dense" />
            <TextField fullWidth label="Company Address" name="companyAddress" value={formData.companyAddress} onChange={handleChange} margin="dense" />
            <TextField fullWidth label="City" name="city" value={formData.city} onChange={handleChange} margin="dense" />
            <TextField fullWidth label="State" name="state" value={formData.state} onChange={handleChange} margin="dense" />
            <TextField fullWidth label="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} margin="dense" />
          </Box>
        </Box>

        <Divider sx={{ borderColor: "#1e2633", my: 3 }} />

        <Box sx={{ textAlign: "right" }}>
          <Button
            variant="contained"
            onClick={handleUpdate}
            sx={{
              background: "#fe7816",
              "&:hover": { background: "#ff8731" }
            }}
          >
            Update Profile
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile;