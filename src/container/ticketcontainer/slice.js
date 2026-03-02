import { createSlice } from "@reduxjs/toolkit";

const ticketSlice = createSlice({
  name: "ticket",
  initialState: {
    loading: false,
    error: null,
    tickets: [],
    eventId: null,   // ✅ add this
  },

  reducers: {
    /* CREATE TICKET TYPE */
    createTicketRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    createTicketSuccess: (state) => {
      state.loading = false;
    },
    createTicketFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* GET TICKETS BY EVENT */
    getTicketsRequest: (state, action) => {
      state.loading = true;
      state.error = null;
      state.eventId = action.payload?.eventId; // optional
    },
    getTicketsSuccess: (state, action) => {
      state.loading = false;
      state.tickets =
        action.payload?.tickets ||
        action.payload?.data ||
        (Array.isArray(action.payload) ? action.payload : []);
      state.error = null;
    },
    getTicketsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* UPDATE TICKET TYPE */
    updateTicketRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateTicketSuccess: (state, action) => {
      state.loading = false;
      state.tickets = state.tickets.map((ticket) =>
        ticket._id === action.payload._id ? action.payload : ticket
      );
    },
    updateTicketFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* UPDATE TICKET STATUS */
    updateTicketStatusRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateTicketStatusSuccess: (state, action) => {
      state.loading = false;
      state.tickets = state.tickets.map((ticket) =>
        ticket._id === action.payload._id ? action.payload : ticket
      );
    },
    updateTicketStatusFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteTicketRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteTicketSuccess: (state, action) => {
      state.loading = false;
      state.tickets = state.tickets.filter(
        (ticket) => ticket._id !== action.payload
      );
    },
    deleteTicketFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  createTicketRequest,
  createTicketSuccess,
  createTicketFailure,
  getTicketsRequest,
  getTicketsSuccess,
  getTicketsFailure,
  updateTicketRequest,
  updateTicketSuccess,
  updateTicketFailure,
  updateTicketStatusRequest,
  updateTicketStatusSuccess,
  updateTicketStatusFailure,
  deleteTicketRequest,
  deleteTicketSuccess,
  deleteTicketFailure,
} = ticketSlice.actions;

export default ticketSlice.reducer;
