import React from "react";
import {
  Box,
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  MenuItem,
  Grid,
} from "@mui/material";
import { Visibility } from "@mui/icons-material";

const stats = [
  { label: "Total Revenue", value: "$168,000" },
  { label: "Tickets Sold", value: "12,000" },
  { label: "Avg Amount", value: "$15.04" },
  { label: "Events Booked", value: "15" },
];

const rows = [
  {
    bookingId: "EVT-001",
    eventName: "Music Fest 2024",
    attendee: "John Doe",
    tickets: 4,
    amount: "$600.00",
    status: "Confirmed",
  },
  {
    bookingId: "EVT-002",
    eventName: "Tech Conference",
    attendee: "Emily Smith",
    tickets: 3,
    amount: "$200.00",
    status: "Confirmed",
  },
  {
    bookingId: "EVT-003",
    eventName: "Food Expo 2024",
    attendee: "Michael Brown",
    tickets: 2,
    amount: "$450.00",
    status: "Confirmed",
  },
];

const ViewBookings = () => {
  return (
    <Box sx={{ p: 4, backgroundColor: "#0b0f14", minHeight: "100vh" }}>
      {/* Header */}
      <Typography variant="h5" sx={{ color: "#fff", mb: 3, fontWeight: 600 }}>
        📄 View Bookings
      </Typography>

      {/* Filters */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          size="small"
          value="2024-04-01"
          sx={{ backgroundColor: "#121821", borderRadius: 1 }}
        />
        <TextField
          size="small"
          value="2024-04-24"
          sx={{ backgroundColor: "#121821", borderRadius: 1 }}
        />
        <TextField
          size="small"
          select
          defaultValue="All Events"
          sx={{ minWidth: 160, backgroundColor: "#121821" }}
        >
          <MenuItem value="All Events">All Events</MenuItem>
          <MenuItem value="Music Fest 2024">Music Fest 2024</MenuItem>
        </TextField>
        <TextField
          size="small"
          placeholder="All Names"
          sx={{
            flex: 1,
            input: { color: "#fff" },
            backgroundColor: "#121821",
          }}
        />
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {stats.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.label}>
            <Paper
              sx={{
                p: 2,
                backgroundColor: "#121821",
                borderRadius: 2,
                textAlign: "center",
              }}
            >
              <Typography sx={{ color: "#9aa4b2", fontSize: 14 }}>
                {item.label}
              </Typography>
              <Typography
                sx={{ color: "#ff9f1c", fontSize: 22, fontWeight: 700 }}
              >
                {item.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Sales Statistics */}
      <Paper
        sx={{
          p: 3,
          mb: 3,
          backgroundColor: "#121821",
          borderRadius: 2,
        }}
      >
        <Typography sx={{ color: "#fff", mb: 2, fontWeight: 600 }}>
          Sale Statistics
        </Typography>

        {/* Chart placeholder */}
        <Box
          sx={{
            height: 220,
            background:
              "repeating-linear-gradient( to right, #ff9f1c 0 10px, transparent 10px 30px )",
            opacity: 0.3,
            borderRadius: 1,
          }}
        />
      </Paper>

      {/* Table */}
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "#121821",
          borderRadius: 2,
          boxShadow: "0 0 0 1px #1e2633",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {[
                "Booking ID",
                "Event Name",
                "Attendee Name",
                "Tickets Booked",
                "Total Amount",
                "Status",
                "Action",
              ].map((head) => (
                <TableCell key={head} sx={{ color: "#9aa4b2", fontWeight: 600 }}>
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.bookingId} hover>
                <TableCell sx={{ color: "#fff" }}>{row.bookingId}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{row.eventName}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{row.attendee}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{row.tickets}</TableCell>
                <TableCell>
                  <Chip
                    label={row.amount}
                    sx={{
                      backgroundColor: "#0f5132",
                      color: "#7fffd4",
                      fontWeight: 600,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Chip label={row.status} color="success" size="small" />
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    startIcon={<Visibility />}
                    sx={{
                      color: "#ff9f1c",
                      border: "1px solid #ff9f1c",
                      "&:hover": {
                        backgroundColor: "rgba(255,159,28,0.1)",
                      },
                    }}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ViewBookings;
