import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    error: null,
    orders: [],
    total: 0,
    page: 1,
    totalPages: 0,
  },

  reducers: {


    /* GET VENDOR ORDERS */
    getVendorOrdersRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
   getVendorOrdersSuccess: (state, action) => {
  state.loading = false;
  state.orders = action.payload;   // 👈 change this
  state.error = null;
},
    getVendorOrdersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },


    /* UPDATE ORDER STATUS */
    updateOrderStatusRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateOrderStatusSuccess: (state, action) => {
      state.loading = false;
      state.orders = state.orders.map((order) =>
        order._id === action.payload._id ? action.payload : order
      );
    },
    updateOrderStatusFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {

  getVendorOrdersRequest,
  getVendorOrdersSuccess,
  getVendorOrdersFailure,
 
  updateOrderStatusRequest,
  updateOrderStatusSuccess,
  updateOrderStatusFailure,
} = orderSlice.actions;

export default orderSlice.reducer;