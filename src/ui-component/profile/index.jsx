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
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";

import PhotoCamera from "@mui/icons-material/PhotoCamera";
import appConfig from '../../config';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
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
    pincode: "",
    password: "",
    confirmPassword: ""
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

  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleUpdate = () => {

    if (formData.password && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "password" && !formData.password) return; // skip empty password
      if (key === "confirmPassword") return;

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

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>

          <Button
            variant="outlined"
            onClick={() => {
              setShowPassword(false);
              setShowConfirmPassword(false);
              setOpenPasswordModal(true);
            }}
            sx={{
              borderColor: "#fe7816",
              color: "#fe7816",
              "&:hover": { borderColor: "#ff8731" }
            }}
          >
            Change Password
          </Button>

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

        <Dialog
          open={openPasswordModal}
          onClose={() => setOpenPasswordModal(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              background: "#111826",
              color: "#fff",
              borderRadius: 3,
              p: 3
            }
          }}
        >

          <DialogTitle>Change Password</DialogTitle>

          <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>

            <TextField
              label="New Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              sx={{
                "& input::-ms-reveal": { display: "none" },
                "& input::-ms-clear": { display: "none" }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(prev => !prev)}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <TextField
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              fullWidth
              sx={{
                "& input::-ms-reveal": { display: "none" },
                "& input::-ms-clear": { display: "none" }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirmPassword(prev => !prev)}>
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

          </DialogContent>

          <DialogActions>
            <Button
              onClick={() => {
                setOpenPasswordModal(false);
                setShowPassword(false);
                setShowConfirmPassword(false);

                setFormData((prev) => ({
                  ...prev,
                  password: "",
                  confirmPassword: ""
                }));
              }}
              sx={{ color: "#aaa" }}
            >
              Cancel
            </Button>

            <Button
              onClick={() => {

                if (!formData.password || !formData.confirmPassword) {
                  alert("Please enter password");
                  return;
                }

                if (formData.password !== formData.confirmPassword) {
                  alert("Passwords do not match");
                  return;
                }

                handleUpdate();
                setOpenPasswordModal(false);

                setShowPassword(false);
                setShowConfirmPassword(false);

                setFormData((prev) => ({
                  ...prev,
                  password: "",
                  confirmPassword: ""
                }));
              }}
              sx={{
                background: "#fe7816",
                color: "#fff",
                "&:hover": { background: "#ff8731" }
              }}
              variant="contained"
            >
              Update Password
            </Button>

          </DialogActions>

        </Dialog>
      </Paper>
    </Box>
  );
};

export default Profile;