import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
  name: "event",
  initialState: {
    loading: false,
    error: null,
    events: [],         // store events
  },
  reducers: {
    /* CREATE EVENT */
    createEventRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    createEventSuccess: (state) => {
      state.loading = false;
    },
    createEventFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* GET EVENTS */
    getEventsRequest: (state, action) => {
      state.loading = true;
      state.error = null;
      state.vendorId = action.payload?.vendorId; // optional, for debugging
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
  },
});

export const {
  createEventRequest,
  createEventSuccess,
  createEventFailure,
  getEventsRequest,
  getEventsSuccess,
  getEventsFailure,
} = eventSlice.actions;

export default eventSlice.reducer;
