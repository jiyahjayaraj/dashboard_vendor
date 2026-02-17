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
} from "@mui/material";
import { Add, Edit } from "@mui/icons-material";
import { useSelector } from "react-redux";
import CreateTicketDrawer from "./CreateTicketDrawer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getTicketsRequest } from "../../container/ticketcontainer/slice";


const TicketManagement = () => {
  const [search, setSearch] = useState("");
  const { tickets, loading } = useSelector((state) => state.ticket);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const [selectedTicket, setSelectedTicket] = useState(null);


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
    <Box sx={{ p: 4, backgroundColor: "#0b0f14", minHeight: "100vh" }}>
      <Typography variant="h5" sx={{ color: "#fff", mb: 3 }}>
        Ticket Management
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Button
          startIcon={<Add />}
          onClick={handleCreate}
          sx={{
            background: "linear-gradient(90deg, #ff7a18, #ff9f1c)",
            color: "#fff",
          }}
        >
          Create New Ticket Type
        </Button>

        <TextField
          size="small"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            input: { color: "#fff" },
            backgroundColor: "#121821",
            borderRadius: 1,
          }}
        />

      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ backgroundColor: "#121821" }}>
          <Table>
            <TableHead>
              <TableRow>
                {[
                  "Ticket Type",
                  "Price",
                  "Tickets Sold",
                  "Revenue",
                  "Status",
                  "Action",
                ].map((h) => (
                  <TableCell key={h} sx={{ color: "#9aa4b2" }}>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredTickets?.map((ticket) => (
                <TableRow key={ticket._id}>
                  <TableCell sx={{ color: "#fff" }}>
                    {ticket.name}
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }}>
                    USD {ticket.price}
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }}>
                    {ticket.ticketsSold}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={`$${(
                        ticket.price * ticket.ticketsSold
                      ).toLocaleString()}`}
                      sx={{
                        backgroundColor: "#0f5132",
                        color: "#7fffd4",
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
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      startIcon={<Edit />}
                      size="small"
                      onClick={() => handleEdit(ticket)}
                    >
                      Edit
                    </Button>

                  </TableCell>
                </TableRow>
              ))}
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
