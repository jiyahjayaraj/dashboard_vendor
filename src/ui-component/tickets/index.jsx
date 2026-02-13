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

const TicketManagement = () => {
  const { tickets, loading } = useSelector((state) => state.ticket);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Box sx={{ p: 4, backgroundColor: "#0b0f14", minHeight: "100vh" }}>
      <Typography variant="h5" sx={{ color: "#fff", mb: 3 }}>
        Ticket Management
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Button
          startIcon={<Add />}
          onClick={() => setDrawerOpen(true)}
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
              {tickets?.map((ticket) => (
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
                    <Button startIcon={<Edit />} size="small">
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
        onClose={() => setDrawerOpen(false)}
      />
    </Box>
  );
};

export default TicketManagement;
