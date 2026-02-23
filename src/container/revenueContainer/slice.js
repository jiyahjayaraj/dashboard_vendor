import { createSlice } from '@reduxjs/toolkit';

const revenueSlice = createSlice({
  name: 'revenue',
  initialState: {
    summary: {},
    overview: [],
    earnings: [],
    loading: false,
    error: null
  },
  reducers: {
    revenueRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    revenueSuccess: (state, action) => {
      state.loading = false;
      state.summary = action.payload.summary;
      state.overview = action.payload.overview;
      state.earnings = action.payload.earnings;
      state.error = null;
    },

    revenueFail: (state, action) => {
      state.loading = false;
      state.error = {
        message: action.payload?.message || 'Revenue fetch failed',
        status: action.payload?.status || 5000
      };
    }
  }
});

export const {
  revenueRequest,
  revenueSuccess,
  revenueFail
} = revenueSlice.actions;

export default revenueSlice.reducer;
