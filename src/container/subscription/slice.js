import { createSlice } from '@reduxjs/toolkit';

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState: {
    data: null,
    loading: false,
    error: null
  },
  reducers: {

    // 🔹 GET SUBSCRIPTION
    getSubscription: (state) => {
      state.loading = true;
      state.error = null;
    },
    getSubscriptionSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    getSubscriptionFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // 🔹 UPDATE PLAN
    updateSubscription: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSubscriptionSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    updateSubscriptionFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // 🔹 CANCEL PLAN
    cancelSubscription: (state) => {
      state.loading = true;
      state.error = null;
    },
    cancelSubscriptionSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    cancelSubscriptionFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }

  }
});

export const {
  getSubscription,
  getSubscriptionSuccess,
  getSubscriptionFail,
  updateSubscription,
  updateSubscriptionSuccess,
  updateSubscriptionFail,
  cancelSubscription,
  cancelSubscriptionSuccess,
  cancelSubscriptionFail
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
