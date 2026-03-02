import { createSlice } from '@reduxjs/toolkit';

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState: {
    data: null,
    loading: false,
    updating: false,
    error: null
  },
  reducers: {
    /* ========= GET ========= */
    getSubscription: (state) => {
      state.loading = true;
      state.error = null;
    },
    getSubscriptionSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload; // ✅ DIRECT OBJECT
    },
    getSubscriptionFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* ========= UPDATE ========= */
    updateSubscription: (state) => {
      state.updating = true;
      state.error = null;
    },
    updateSubscriptionSuccess: (state, action) => {
      state.updating = false;
      state.data = action.payload;
    },
    updateSubscriptionFail: (state, action) => {
      state.updating = false;
      state.error = action.payload;
    },

    /* ========= CANCEL ========= */
    cancelSubscription: (state) => {
      state.updating = true;
      state.error = null;
    },
    cancelSubscriptionSuccess: (state, action) => {
      state.updating = false;
      state.data = action.payload;
    },
    cancelSubscriptionFail: (state, action) => {
      state.updating = false;
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