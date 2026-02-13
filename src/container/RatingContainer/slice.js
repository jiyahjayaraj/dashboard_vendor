import { createSlice } from '@reduxjs/toolkit';

const ratingSlice = createSlice({
    name: 'rating',
    initialState: {
        list: [], 
        listLoading: false, 
        listError: null,
        listCount: 0 
    },
    reducers: {

        getRatingCount: (state, action) => {
            state.listLoading = true;
        },
        getRatingCountSuccess: (state, action) => {
            state.listLoading = false;
            state.listCount = action.payload.count; 
        },
        getRatingCountFail: (state, action) => {
            state.listLoading = false;

        }
    }
});


export const {
    getRatingCount,
    getRatingCountSuccess,
    getRatingCountFail
} = ratingSlice.actions;


export const selectRatingList = (state) => state.rating.list;
export const selectRatingListLoading = (state) => state.rating.listLoading;
export const selectRatingListError = (state) => state.rating.listError;

export default ratingSlice.reducer;