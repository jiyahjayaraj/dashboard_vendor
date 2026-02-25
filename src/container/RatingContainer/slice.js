import { createSlice } from '@reduxjs/toolkit';

const ratingSlice = createSlice({
  name: 'rating',
  initialState: {
    list: [],               // all feedbacks
    listLoading: false,
    listError: null,
    listCount: 0,           // total feedback count
    avgRating: 0            // average rating
  },
  reducers: {
    /* =========================
       GET VENDOR FEEDBACKS
    ========================= */

    getVendorFeedbacks: (state) => {
      state.listLoading = true;
      state.listError = null;
    },

    getVendorFeedbacksSuccess: (state, action) => {
      state.listLoading = false;
      state.list = action.payload.feedbacks || [];
      state.listCount = action.payload.totalFeedback || 0;
      state.avgRating = action.payload.averageRating || 0;
    },

    getVendorFeedbacksFail: (state, action) => {
      state.listLoading = false;
      state.listError = action.payload || 'Failed to fetch feedbacks';
    },
    deleteFeedback: (state) => {
      state.listLoading = true;
    },

    deleteFeedbackSuccess: (state, action) => {
      state.listLoading = false;

      state.list = state.list.filter(
        (item) => item._id !== action.payload
      );

      state.listCount = state.list.length;
    },

    deleteFeedbackFail: (state, action) => {
      state.listLoading = false;
      state.listError = action.payload;
    },
  }

});

export const {
  getVendorFeedbacks,
  getVendorFeedbacksSuccess,
  getVendorFeedbacksFail,
  deleteFeedback,
  deleteFeedbackSuccess,
  deleteFeedbackFail
} = ratingSlice.actions;

/* =========================
   SELECTORS
========================= */

export const selectRatingList = (state) => state.rating.list;
export const selectRatingListLoading = (state) => state.rating.listLoading;
export const selectRatingListError = (state) => state.rating.listError;
export const selectRatingCount = (state) => state.rating.listCount;
export const selectAverageRating = (state) => state.rating.avgRating;

export default ratingSlice.reducer;