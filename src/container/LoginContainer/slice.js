import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        data: {},
        userData: [],
        loading: false,
        error: null,

        // NEW STATE
        profileIncomplete: false
    },

    reducers: {

        userLogin: (state) => {
            state.loading = true;
            state.error = null;
        },

        loginSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        },

        loginFail: (state, action) => {
            state.loading = false;
            state.error = {
                message: action.payload.message || 'Login failed',
                status: action.payload.status || 5000
            };
        },

        userMe: (state) => {
            state.loading = true;
            state.error = null;
        },

        userMeSuccess: (state, action) => {
            state.loading = false;
            state.userData = action.payload;
            state.error = null;

            const vendor = action.payload;


            state.profileIncomplete = !(
                vendor.vendorMobile &&
                vendor.companyName &&
                vendor.companyAddress &&
                vendor.city &&
                vendor.state &&
                vendor.pincode
            );
        },

        userMeFail: (state) => {
            state.loading = false;
        },
        updateProfile: (state) => {
            state.loading = true;
        },
        updateProfileSuccess: (state) => {
            state.loading = false;
        },
        updateProfileFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        setProfileIncomplete: (state, action) => {
            state.profileIncomplete = action.payload;
        }

    }
});

export const {
    userLogin,
    loginSuccess,
    loginFail,
    userMe,
    userMeSuccess,
    userMeFail,
    setProfileIncomplete,
    updateProfile

} = loginSlice.actions;

export const selectError = (state) => state.login.error;

export default loginSlice.reducer;