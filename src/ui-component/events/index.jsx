import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  createEventRequest,
  getEventsRequest
} from "container/eventContainer/slice";

import {
  Box,
  Button,
  Drawer,
  Grid,
  TextField,
  Typography
} from "@mui/material";

import "./events.css";

export default function Events() {
  const dispatch = useDispatch();

  const events = useSelector((state) => state.event?.events || []);
  const user = useSelector((state) => state?.login?.userData || {});
  const vendorId = user?._id;

  const [openDrawer, setOpenDrawer] = useState(false);
  const [preview, setPreview] = useState(null);

  console.log("events", events);

  const [form, setForm] = useState({
    eventName: "",
    description: "",
    category: "",
    city: "",
    eventLocation: "",
    eventDate: "",
    startTime: "",
    endTime: "",
    price: "",
    totalTickets: "",
    earlyPrice: "",
    earlyDeadline: "",
    bannerImage: null
  });

  useEffect(() => {
    if (vendorId) {
      dispatch(getEventsRequest({ vendorId }));
    }
  }, [dispatch, vendorId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, bannerImage: file });
    setPreview(URL.createObjectURL(file));
  };

  // ✅ UPDATED: Now sending FormData
  const handleSubmit = () => {
    if (!form.eventName) return;

    const formData = new FormData();

    formData.append("eventName", form.eventName);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("city", form.city);
    formData.append("eventLocation", form.eventLocation);
    formData.append("eventDate", form.eventDate);
    formData.append("startTime", form.startTime);
    formData.append("endTime", form.endTime);
    formData.append("price", form.price);
    formData.append("totalTickets", form.totalTickets);
    formData.append("earlyPrice", form.earlyPrice);
    formData.append("earlyDeadline", form.earlyDeadline);
    formData.append("vendorId", vendorId);

    if (form.bannerImage) {
      formData.append("bannerImage", form.bannerImage);
    }

    dispatch(createEventRequest(formData));

    setOpenDrawer(false);
  };

  const BASE_URL = "http://localhost:5000";

  return (
    <Box className="events-page">

      <Box className="events-header">
        <Typography variant="h4">Events</Typography>
        <Button variant="contained" onClick={() => setOpenDrawer(true)}>
          Create Event
        </Button>
      </Box>

      {events.length === 0 && (
        <Box className="empty-state">
          <Typography>No Events Created Yet</Typography>
        </Box>
      )}

      {events.length > 0 && (
        <Box className="events-list">
          {events.map((e) => (
            <Box key={e._id} className="event-card">

              <Box className="event-image">
                <img
                  src={
                    e.bannerImage
                      ? `${BASE_URL}${e.bannerImage}`
                      : "/placeholder.jpg"
                  }
                  alt={e.eventName}
                />
              </Box>

              <Box className="event-info">
                <Typography className="event-title">
                  {e.eventName}
                </Typography>
                <Typography className="event-location">
                  {e.eventLocation || "N/A"}
                </Typography>
                <Typography className="event-date">
                  {e.eventDate
                    ? new Date(e.eventDate).toDateString()
                    : "N/A"}
                </Typography>
              </Box>

              <Box className="event-actions">
                <Button size="small">View</Button>
                <Button size="small">Edit</Button>
                <Button size="small" variant="outlined">
                  Manage Tickets
                </Button>
              </Box>

            </Box>
          ))}
        </Box>
      )}

      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Box className="event-drawer">

          <Typography className="drawer-title">
            Create Event
          </Typography>

          <TextField
            fullWidth
            name="eventName"
            placeholder="Event Title"
            value={form.eventName}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            multiline
            rows={3}
            name="description"
            placeholder="Event Description"
            value={form.description}
            onChange={handleChange}
          />

          <Box className="banner-box">
            <Typography>Event Banner</Typography>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />

            {preview && (
              <img
                src={preview}
                alt="event"
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginTop: "8px"
                }}
              />
            )}
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="eventLocation"
                placeholder="Venue Name"
                value={form.eventLocation}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                type="date"
                name="eventDate"
                value={form.eventDate}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                type="time"
                name="startTime"
                value={form.startTime}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                type="time"
                name="endTime"
                value={form.endTime}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Box className="drawer-actions">
            <Button onClick={() => setOpenDrawer(false)}>
              Save as Draft
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              Create Event
            </Button>
          </Box>

        </Box>
      </Drawer>
    </Box>
  );
}
