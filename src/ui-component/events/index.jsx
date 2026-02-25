import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  createEventRequest,
  getEventsRequest,
  updateEventRequest
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
  const [viewOpen, setViewOpen] = useState(false);
  const [ticketOpen, setTicketOpen] = useState(false);

  const [preview, setPreview] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

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

  const resetForm = () => {
    setForm({
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
    setPreview(null);
    setIsEdit(false);
    setEditId(null);
  };

  const handleSubmit = () => {
    if (!form.eventName) return;

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      if (form[key] !== null && form[key] !== "") {
        formData.append(key, form[key]);
      }
    });

    formData.append("vendorId", vendorId);

    if (isEdit) {
      dispatch(updateEventRequest({ id: editId, data: formData }));
    } else {
      dispatch(createEventRequest(formData));
    }

    setTimeout(() => {
      dispatch(getEventsRequest({ vendorId }));
    }, 500);

    setOpenDrawer(false);
    resetForm();
  };

  const BASE_URL = "http://localhost:5000";

  const drawerStyle = {
    PaperProps: {
      sx: {
        width: "70%",
        maxWidth: "1000px"
      }
    }
  };

  return (
    <Box className="events-page">

      <Box className="events-header">
        <Typography variant="h4">Events</Typography>
        <Button
          variant="contained"
          onClick={() => {
            resetForm();
            setOpenDrawer(true);
          }}
        >
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
{[...events].reverse().map((e) => (    
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
                <Button
                  size="small"
                  onClick={() => {
                    setSelectedEvent(e);
                    setViewOpen(true);
                  }}
                >
                  View
                </Button>

                <Button
                  size="small"
                  onClick={() => {
                    setForm({
                      ...e,
                      eventDate: e.eventDate?.split("T")[0],
                      bannerImage: null
                    });
                    setPreview(
                      e.bannerImage
                        ? `${BASE_URL}${e.bannerImage}`
                        : null
                    );
                    setEditId(e._id);
                    setIsEdit(true);
                    setOpenDrawer(true);
                  }}
                >
                  Edit
                </Button>


              </Box>

            </Box>
          ))}
        </Box>
      )}

      {/* CREATE / EDIT DRAWER */}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        {...drawerStyle}
      >
        <Box className="event-drawer">

          <Typography className="drawer-title">
            {isEdit ? "Update Event" : "Create Event"}
          </Typography>

          {/* ================= BASIC INFO ================= */}
          <div className="drawer-card">
            <Typography className="section-heading">
              Basic Information
            </Typography>

            <TextField
              fullWidth
              name="eventName"
              label="Event Title *"
              value={form.eventName}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              multiline
              rows={4}
              name="description"
              label="Event Description *"
              value={form.description}
              onChange={handleChange}
              sx={{ mt: 2 }}
            />

            <TextField
              fullWidth
              name="category"
              label="Category *"
              value={form.category}
              onChange={handleChange}
              sx={{ mt: 2 }}
            />
          </div>

          {/* ================= EVENT BANNER ================= */}
          <div className="drawer-card">
            <Typography className="section-heading">
              Event Banner
            </Typography>
            <Typography className="section-sub">
              Upload an attractive banner image for your event
            </Typography>

            <div className="upload-box">
              <input type="file" accept="image/*" onChange={handleFileChange} />
              {preview && (
                <img src={preview} alt="preview" className="preview-img" />
              )}
            </div>
          </div>

          {/* ================= LOCATION ================= */}
          <div className="drawer-card">
            <Typography className="section-heading">
              Location & Venue
            </Typography>
            <Typography className="section-sub">
              Where will your event take place?
            </Typography>

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="city"
                  label="City / Location *"
                  value={form.city}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="eventLocation"
                  label="Venue Name *"
                  value={form.eventLocation}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </div>

          {/* ================= DATE & TIME ================= */}
          <div className="drawer-card">
            <Typography className="section-heading">
              Date & Time
            </Typography>
            <Typography className="section-sub">
              When will your event take place?
            </Typography>

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  type="date"
                  name="eventDate"
                  label="Event Date *"
                  InputLabelProps={{ shrink: true }}
                  value={form.eventDate}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  type="time"
                  name="startTime"
                  label="Start Time *"
                  InputLabelProps={{ shrink: true }}
                  value={form.startTime}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  type="time"
                  name="endTime"
                  label="End Time *"
                  InputLabelProps={{ shrink: true }}
                  value={form.endTime}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </div>

          {/* ================= TICKETING ================= */}


          {/* ================= ACTIONS ================= */}
          <Box className="drawer-actions">
            <Button variant="outlined" className="draft-btn">
              Save as Draft
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              {isEdit ? "Update Event" : "Create Event"}
            </Button>
          </Box>

        </Box>
      </Drawer>


      {/* VIEW DRAWER */}
      <Drawer anchor="right" open={viewOpen} onClose={() => setViewOpen(false)} {...drawerStyle}>
        {selectedEvent && (
          <Box className="event-drawer">
            <Typography className="drawer-title">Event Details</Typography>
            <img
              src={selectedEvent.bannerImage ? `${BASE_URL}${selectedEvent.bannerImage}` : "/placeholder.jpg"}
              alt="banner"
              className="view-banner"
            />

            <div className="view-section"><div className="view-label">Event Name</div><div className="view-value">{selectedEvent.eventName}</div></div>
            <div className="view-section"><div className="view-label">Description</div><div className="view-value">{selectedEvent.description}</div></div>
            <div className="view-section"><div className="view-label">Location</div><div className="view-value">{selectedEvent.city} - {selectedEvent.eventLocation}</div></div>
            <div className="view-section"><div className="view-label">Date</div><div className="view-value">{new Date(selectedEvent.eventDate).toDateString()}</div></div>
            <div className="view-section"><div className="view-label">Time</div><div className="view-value">{selectedEvent.startTime} - {selectedEvent.endTime}</div></div>
          </Box>
        )}
      </Drawer>

      {/* MANAGE TICKETS DRAWER */}


    </Box>
  );
}