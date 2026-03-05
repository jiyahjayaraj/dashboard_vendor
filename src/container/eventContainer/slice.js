import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
  name: "event",
  initialState: {
    loading: false,
    error: null,
    events: [],
    createdEvent: null   // ✅ added
  },
  reducers: {
    /* CREATE EVENT */
    createEventRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    createEventSuccess: (state, action) => {
      state.loading = false;
      state.createdEvent =
        action.payload?.data || action.payload; // ✅ store event
    },
    createEventFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;

      // optional: detect plan limit
      if (action.payload?.toLowerCase().includes("plan")) {
        state.subscriptionError = action.payload;
      }
    },

    clearCreatedEvent: (state) => {
      state.createdEvent = null; // ✅ reset after navigation
    },

    /* GET EVENTS */
    getEventsRequest: (state, action) => {
      state.loading = true;
      state.error = null;
      state.vendorId = action.payload?.vendorId;
    },
    getEventsSuccess: (state, action) => {
      state.loading = false;
      state.events =
        action.payload?.events ||
        action.payload?.data ||
        (Array.isArray(action.payload) ? action.payload : []);
      state.error = null;
    },
    getEventsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* UPDATE EVENT */
    updateEventRequest: (state) => {
      state.loading = true;
    },
    updateEventSuccess: (state) => {
      state.loading = false;
    },
    updateEventFailure: (state) => {
      state.loading = false;
    },
  },
});

export const {
  createEventRequest,
  createEventSuccess,
  createEventFailure,
  getEventsRequest,
  getEventsSuccess,
  getEventsFailure,
  updateEventRequest,
  updateEventSuccess,
  updateEventFailure,
  clearCreatedEvent
} = eventSlice.actions;

export default eventSlice.reducer;
