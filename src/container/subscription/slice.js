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
      state.data = action.payload;
    },
    getSubscriptionFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* ========= UPGRADE ========= */
    upgradeSubscription: (state, action) => {
      state.updating = true;
      state.error = null;
    },
    upgradeSubscriptionSuccess: (state, action) => {
      state.updating = false;
      state.data = action.payload;
    },
    upgradeSubscriptionFail: (state, action) => {
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
  upgradeSubscription,
  upgradeSubscriptionSuccess,
  upgradeSubscriptionFail,
  cancelSubscription,
  cancelSubscriptionSuccess,
  cancelSubscriptionFail
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;