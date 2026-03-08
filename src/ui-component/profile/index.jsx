import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Button,
  Paper,
  Avatar,
  TextField,
  Divider,
  IconButton,
  Typography
} from "@mui/material";

import PhotoCamera from "@mui/icons-material/PhotoCamera";
import appConfig from '../../config';
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

  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    dispatch(userMe());
  }, [dispatch]);

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

    setPreview(
  vendor?.profileImage
    ? `${appConfig.ip}/uploads/${vendor.profileImage}`
    : ""
);
  }, [vendor]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = () => {
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    if (avatar) {
      data.append("profileImage", avatar);
    }

    dispatch(updateProfile(data));
  };

  return (
    <Box sx={{ p: 4, background: "#0b0f14", minHeight: "100vh" }}>
      <Paper
        sx={{
          p: 4,
          background: "linear-gradient(145deg,#111826,#0b0f14)",
          borderRadius: 3,
          boxShadow: "0 10px 30px rgba(0,0,0,0.6)"
        }}
      >
        {/* Header */}
        <Typography
          variant="h5"
          sx={{
            mb: 3,
            fontWeight: 600,
            color: "#fff"
          }}
        >
          Profile Information
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 5,
            alignItems: "flex-start"
          }}
        >
          {/* Avatar Section */}
          <Box sx={{ textAlign: "center" }}>
            <Box
              sx={{
                position: "relative",
                width: 120,
                height: 120,
                margin: "auto"
              }}
            >
              <Avatar
                src={preview}
                sx={{
                  width: "100%",
                  height: "100%",
                  background: "#1e2633",
                  fontSize: 40
                }}
              />

              <input
                accept="image/*"
                style={{ display: "none" }}
                id="upload-avatar"
                type="file"
                onChange={handleImageChange}
              />

              <label htmlFor="upload-avatar">
                <IconButton
                  component="span"
                  sx={{
                    position: "absolute",
                    bottom: -5,
                    right: -5,
                    background: "#fe7816",
                    width: 36,
                    height: 36,
                    "&:hover": { background: "#ff8731" }
                  }}
                >
                  <PhotoCamera sx={{ color: "#fff", fontSize: 18 }} />
                </IconButton>
              </label>
            </Box>

            <Typography
              sx={{
                mt: 2,
                color: "#9aa4b2",
                fontSize: 13
              }}
            >
              Upload Profile Photo
            </Typography>
          </Box>

          {/* Form Section */}
          <Box
            sx={{
              flex: 1,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 2
            }}
          >
            <TextField
              fullWidth
              label="Name"
              name="vendorName"
              value={formData.vendorName}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Email"
              name="vendorEmail"
              value={formData.vendorEmail}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Mobile"
              name="vendorMobile"
              value={formData.vendorMobile}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Company Address"
              name="companyAddress"
              value={formData.companyAddress}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
            />
          </Box>
        </Box>

        <Divider sx={{ borderColor: "#1e2633", my: 4 }} />

        {/* Update Button */}
        <Box sx={{ textAlign: "right" }}>
          <Button
            variant="contained"
            onClick={handleUpdate}
            sx={{
              px: 4,
              py: 1.2,
              background: "#fe7816",
              fontWeight: 600,
              borderRadius: 2,
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