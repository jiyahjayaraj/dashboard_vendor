import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSubscription } from "container/subscription/slice";

import {
  createEventRequest,
  getEventsRequest,
  updateEventRequest,
  clearCreatedEvent
} from "container/eventContainer/slice";

import {
  Box,
  Button,
  Drawer,
  Grid,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent
} from "@mui/material";

import "./events.css";

export default function Events() {
  const subscription = useSelector((state) => state.subscription?.data);
  const [eventTypes, setEventTypes] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const createdEvent = useSelector((state) => state.event?.createdEvent);

  const events = useSelector((state) => state.event?.events || []);
  const user = useSelector((state) => state?.login?.userData || {});
  const vendorId = user?._id;

  const [openDrawer, setOpenDrawer] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);

  const [preview, setPreview] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    eventName: "",
    description: "",
    eventType: "",
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
    fetch("http://localhost:5000/api/eventtypes")
      .then((res) => res.json())
      .then((data) => {
        setEventTypes(data.data || []);
      });
  }, []);

  useEffect(() => {
    if (vendorId) {
      dispatch(getEventsRequest({ vendorId }));
    }
  }, [dispatch, vendorId]);

  useEffect(() => {
    if (createdEvent && !isEdit) {
      navigate("/tickets");
      dispatch(clearCreatedEvent());
    }
  }, [createdEvent, navigate, isEdit, dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (vendorId) {
      dispatch(getSubscription({ vendorId }));
    }
  }, [vendorId, dispatch]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, bannerImage: file });
    setPreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setForm({
      eventName: "",
      description: "",
      eventType: "",
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

    if (isEdit) {
      dispatch(updateEventRequest({ id: editId, data: formData }));
    } else {
      dispatch(createEventRequest(formData));
    }

    setOpenDrawer(false);
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

  const PLAN_LIMITS = {
    basic: 3,
    professional: 10,
    enterprise: -1
  };

  const currentPlan = subscription?.plan?.toLowerCase() || "basic";
  const maxEvents = PLAN_LIMITS[currentPlan];
  const eventCount = events.length;

  const limitReached =
    maxEvents !== -1 && eventCount >= maxEvents;

  return (
    <Box className="events-page">

      <Box className="events-header">
        <Typography variant="h4">Events</Typography>

        <Box display="flex" gap={2} alignItems="center">

          <Typography>
            {maxEvents === -1
              ? "Unlimited events"
              : `${eventCount} / ${maxEvents} events used`}
          </Typography>

          <Button
            variant="contained"
            disabled={limitReached}
            onClick={() => {
              resetForm();
              setOpenDrawer(true);
            }}
          >
            {limitReached ? "Upgrade to add more" : "Create Event"}
          </Button>

          {limitReached && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/subscription")}
            >
              Upgrade Plan
            </Button>
          )}

        </Box>
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
                      eventType: e.eventType || "",
                      eventDate: e.eventDate
                        ? new Date(e.eventDate).toISOString().split("T")[0]
                        : "",
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

          {/* BASIC INFO */}
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

            <FormControl fullWidth sx={{ mt: 2 }}>

              <InputLabel>Event Type *</InputLabel>

              <Select
                name="eventType"
                value={form.eventType || ""}
                onChange={handleChange}
                label="Event Type *"
              >
                <MenuItem value="">Select Event Type</MenuItem>

                {eventTypes.map((type) => (
                  <MenuItem key={type._id} value={type._id}>
                    {type.name}
                  </MenuItem>
                ))}

              </Select>

            </FormControl>

          </div>

          {/* BANNER */}
          <div className="drawer-card">

            <Typography className="section-heading">
              Event Banner
            </Typography>

            <div className="upload-box">
              <input type="file" accept="image/*" onChange={handleFileChange} />

              {preview && (
                <img src={preview} alt="preview" className="preview-img" />
              )}

            </div>

          </div>

          {/* LOCATION */}
          <div className="drawer-card">

            <Typography className="section-heading">
              Location & Venue
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

          {/* DATE TIME */}
          {/* DATE TIME */}
          {/* DATE TIME */}
          <div className="drawer-card">

            <Typography className="section-heading">
              Date & Time
            </Typography>

            {/* Warning when creating */}
            {!isEdit && (
              <Typography
                sx={{
                  background: "#fff3cd",
                  color: "#856404",
                  padding: "10px",
                  borderRadius: "6px",
                  fontSize: "14px",
                  marginBottom: "12px"
                }}
              >
                ⚠️ Once the event is created, the event date cannot be changed later.
              </Typography>
            )}

            {/* Warning when editing */}
            {isEdit && (
              <Typography
                sx={{
                  background: "#fdecea",
                  color: "#b71c1c",
                  padding: "10px",
                  borderRadius: "6px",
                  fontSize: "14px",
                  marginBottom: "12px"
                }}
              >
                🔒 Event date cannot be edited after creation. You can still adjust the event time.
              </Typography>
            )}

            <Grid container spacing={2}>

              {/* DATE LOCKED */}
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  type="date"
                  name="eventDate"
                  label="Event Date"
                  InputLabelProps={{ shrink: true }}
                  value={form.eventDate}
                  onChange={handleChange}
                  disabled={isEdit}   // 🔒 only date locked
                />
              </Grid>

              {/* START TIME EDITABLE */}
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  type="time"
                  name="startTime"
                  label="Start Time"
                  InputLabelProps={{ shrink: true }}
                  value={form.startTime}
                  onChange={handleChange}
                />
              </Grid>

              {/* END TIME EDITABLE */}
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  type="time"
                  name="endTime"
                  label="End Time"
                  InputLabelProps={{ shrink: true }}
                  value={form.endTime}
                  onChange={handleChange}
                />
              </Grid>

            </Grid>

          </div>

          <Box className="drawer-actions">

            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={!vendorId || !form.eventName}
            >
              {isEdit ? "Update Event" : "Create Event"}
            </Button>

          </Box>

        </Box>

      </Drawer>

      <Dialog
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        maxWidth="md"
        fullWidth
        BackdropProps={{
          sx: {
            backdropFilter: "blur(2px)",
            backgroundColor: "rgba(0,0,0,0.6)"
          }
        }}
      >

        <DialogTitle
          sx={{
            background: "#0f0f0f",
            color: "#ff7a00",
            fontWeight: 600
          }}
        >
          Event Details
        </DialogTitle>

        <DialogContent
          sx={{
            background: "#0f0f0f",
            color: "#ffffff"
          }}
        >

          {selectedEvent && (
            <Box>

              {/* Banner */}
              {selectedEvent.bannerImage && (
                <Box mb={3}>
                  <img
                    src={`${BASE_URL}${selectedEvent.bannerImage}`}
                    alt="banner"
                    style={{
                      width: "100%",
                      borderRadius: "10px",
                      maxHeight: "250px",
                      objectFit: "cover"
                    }}
                  />
                </Box>
              )}

              {/* Event Name */}
              <Typography
                variant="h5"
                sx={{ fontWeight: 600, mb: 2 }}
              >
                {selectedEvent.eventName}
              </Typography>

              {/* Description */}
              <Typography
                sx={{ color: "text.secondary", mb: 3 }}
              >
                {selectedEvent.description}
              </Typography>

              {/* Details Grid */}
              <Grid container spacing={3}>

                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">
                    Event Type
                  </Typography>

                  <Typography sx={{ fontWeight: 500 }}>
                    {
                      eventTypes.find(
                        (t) => t._id === selectedEvent.eventType
                      )?.name || "N/A"
                    }
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">
                    City
                  </Typography>

                  <Typography sx={{ fontWeight: 500 }}>
                    {selectedEvent.city}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">
                    Venue
                  </Typography>

                  <Typography sx={{ fontWeight: 500 }}>
                    {selectedEvent.eventLocation}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">
                    Date
                  </Typography>

                  <Typography sx={{ fontWeight: 500 }}>
                    {new Date(selectedEvent.eventDate).toDateString()}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">
                    Start Time
                  </Typography>

                  <Typography sx={{ fontWeight: 500 }}>
                    {selectedEvent.startTime}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">
                    End Time
                  </Typography>

                  <Typography sx={{ fontWeight: 500 }}>
                    {selectedEvent.endTime}
                  </Typography>
                </Grid>

              </Grid>

            </Box>
          )}

        </DialogContent>

      </Dialog>

    </Box>
  );
}