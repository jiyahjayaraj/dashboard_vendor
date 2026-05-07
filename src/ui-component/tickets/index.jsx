import React, { useState } from "react";
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
  CircularProgress,
  MenuItem,
  Stack,
} from "@mui/material";
import { Add, Edit } from "@mui/icons-material";
import { useSelector } from "react-redux";
import CreateTicketDrawer from "./CreateTicketDrawer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getTicketsRequest } from "../../container/ticketcontainer/slice";
import { getEventsRequest } from "../../container/eventContainer/slice";
import { Delete } from "@mui/icons-material";
import { deleteTicketRequest } from "../../container/ticketcontainer/slice";

const TicketManagement = () => {
  const vendorId = useSelector((state) => state.login.userData?._id);
  const { events } = useSelector((state) => state.event);
  const [search, setSearch] = useState("");
  const { tickets, loading } = useSelector((state) => state.ticket);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState(localStorage.getItem("eventId") || "");

  const handleDelete = (ticketId) => {
    if (!window.confirm("Are you sure you want to delete this ticket type?"))
      return;

    dispatch(
      deleteTicketRequest({
        ticketTypeId: ticketId,
        eventId: selectedEventId,
      })
    );
  };

  useEffect(() => {
    if (!selectedEventId) return;

    localStorage.setItem("eventId", selectedEventId);
    dispatch(getTicketsRequest({ eventId: selectedEventId }));
  }, [selectedEventId, dispatch]);

  useEffect(() => {
    if (vendorId) {
      dispatch(getEventsRequest({ vendorId }));
    }
  }, [vendorId, dispatch]);


  const eventList = Array.isArray(events)
    ? events
    : events?.events || events?.data?.events || [];



  useEffect(() => {
    const eventId = localStorage.getItem("eventId");

    if (!eventId) {
      console.log("No eventId found");
      return;
    }

    dispatch(getTicketsRequest({ eventId }));
  }, [dispatch]);

  useEffect(() => {
    if (!drawerOpen) {
      const eventId = localStorage.getItem("eventId");
      if (eventId) {
        dispatch(getTicketsRequest({ eventId }));
      }
    }
  }, [drawerOpen, dispatch]);


  const handleEdit = (ticket) => {
    setSelectedTicket(ticket);
    setDrawerOpen(true);
  };
  const handleCreate = () => {
    setSelectedTicket(null);
    setDrawerOpen(true);
  };

  const filteredTickets = tickets?.filter((ticket) =>
    ticket.name.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <Box p={3}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold" fontSize={"20px"}>
            Ticket Management
          </Typography>
          <Typography variant="body2" color="gray">
            {filteredTickets?.length || 0} tickets found
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleCreate}
          sx={{
            background: "linear-gradient(135deg,#f97316,#ea580c)",
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: "bold",
            padding: "8px 18px",
            fontSize: "13px",
            boxShadow: "0 4px 14px rgba(249,115,22,0.35)"
          }}
        >
          Create New Ticket Type
        </Button>
      </Stack>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 3,
        }}
      >
        <TextField
          select
          label="Filter by Event"
          value={selectedEventId}
          onChange={(e) => setSelectedEventId(e.target.value)}
          sx={{
            maxWidth: 240,
            fullWidth: true,
            background: "#0b0b0b",
            borderRadius: "8px"
          }}
        >
          {eventList.length > 0 ? (
            eventList.map((event) => (
              <MenuItem key={event._id} value={event._id}>
                {event.eventName}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No events</MenuItem>
          )}
        </TextField>

        <TextField
          placeholder="Search tickets..."
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            maxWidth: 420,
            background: "#0b0b0b",
            borderRadius: "8px"
          }}
        />
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0px 6px 18px rgba(0,0,0,0.08)"
          }}
        >
          <Table>
            <TableHead
              sx={{
                background: "#2b1a0f",
              }}
            >
              <TableRow>
                {[
                  "Ticket Type",
                  "Price",
                  "Total Ticket",
                  "Tickets Sold",
                  "Revenue",
                  "Status",
                  "Action",
                ].map((h) => (
                  <TableCell key={h}>
                    <b>{h}</b>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTickets?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No Tickets Found
                  </TableCell>
                </TableRow>
              ) : (
                filteredTickets?.map((ticket) => (
                  <TableRow key={ticket._id}>
                    <TableCell>
                      {ticket.name}
                    </TableCell>
                    <TableCell>
                      ₹ {ticket.price}
                    </TableCell>
                    <TableCell>
                      {ticket.totalQuantity}
                    </TableCell>
                    <TableCell>
                      {ticket.ticketsSold}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={`₹ ${(
                          ticket.price * ticket.ticketsSold
                        ).toLocaleString()}`}
                        size="small"
                        sx={{
                          backgroundColor: "#0f5132",
                          color: "#7fffd4",
                          fontWeight: "bold"
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={ticket.status}
                        color={
                          ticket.status === "ACTIVE"
                            ? "success"
                            : "default"
                        }
                        size="small"
                        sx={{ fontWeight: "bold" }}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        startIcon={<Edit />}
                        size="small"
                        onClick={() => handleEdit(ticket)}
                        sx={{ color: "#ff8c00" }}
                      >
                        Edit
                      </Button>

                      <Button
                        startIcon={<Delete />}
                        size="small"
                        color="error"
                        onClick={() => handleDelete(ticket._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <CreateTicketDrawer
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedTicket(null);
        }}
        ticketData={selectedTicket}
      />
    </Box>
  );
};

export default TicketManagement;
