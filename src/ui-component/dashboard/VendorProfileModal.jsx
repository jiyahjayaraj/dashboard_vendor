import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Grid,
    Button,
    Typography,
    Box
} from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import appConfig from "../../config";
import commonApi from "../../container/api";
import { setProfileIncomplete,userMe } from "../../container/LoginContainer/slice";

const VendorProfileModal = () => {

    const dispatch = useDispatch();

    const profileIncomplete = useSelector(
        state => state.login.profileIncomplete
    );

    const user = useSelector(
        state => state.login.userData
    );


    const formik = useFormik({

        initialValues: {
            vendorName: user?.vendorName || "",
            vendorEmail: user?.vendorEmail || "",

            vendorMobile: user?.vendorMobile || "",
            companyName: user?.companyName || "",
            companyAddress: user?.companyAddress || "",
            city: user?.city || "",
            state: user?.state || "",
            pincode: user?.pincode || ""
        },

        enableReinitialize: true,

        validationSchema: Yup.object({

            vendorMobile: Yup.string()
                .required("Mobile required"),

            companyName: Yup.string()
                .required("Company name required"),

            companyAddress: Yup.string()
                .required("Address required")

        }),

onSubmit: async (values) => {

    try {

        const params = {

            api:`${appConfig.ip}/api/updateProfile`,
            method:"PUT",
            authorization:"Bearer",
            token:localStorage.getItem("token"),
            body:values

        };

        await commonApi(params);

        // ✅ Reload profile from DB
        dispatch(userMe());

        dispatch(setProfileIncomplete(false));

    }
    catch(err){

        console.log(err);

    }

}

    });


    return (

        <Dialog
            open={
                user &&
                (!user.vendorMobile ||
                    !user.companyName ||
                    !user.companyAddress)
            }
            fullWidth
            maxWidth="md"
            disableEscapeKeyDown
            sx={{
                '& .MuiDialog-paper': {
                    borderRadius: 3,
                    padding: 2,
                    background: "#0b0f14",
                    border: "1px solid #fe7816"
                }
            }}
        >


            <DialogTitle
                sx={{
                    textAlign: "center",
                    color: "#fe7816",
                    fontWeight: 700
                }}
            >

                Complete Vendor Profile

            </DialogTitle>



            <DialogContent>

                <Typography
                    sx={{
                        mb: 3,
                        textAlign: "center",
                        color: "#ccc"
                    }}
                >

                    Please complete your profile to continue

                </Typography>


                <form onSubmit={formik.handleSubmit}>

                    <Grid container spacing={2}>


                        {/* READ ONLY */}

                        <Grid item xs={6}>

                            <TextField
                                fullWidth
                                label="Vendor Name"
                                value={formik.values.vendorName}
                                InputProps={{
                                    readOnly: true
                                }}
                            />

                        </Grid>


                        <Grid item xs={6}>

                            <TextField
                                fullWidth
                                label="Email"
                                value={formik.values.vendorEmail}
                                InputProps={{
                                    readOnly: true
                                }}
                            />

                        </Grid>



                        {/* EDITABLE */}

                        <Grid item xs={6}>

                            <TextField
                                fullWidth
                                label="Mobile Number"
                                name="vendorMobile"
                                value={formik.values.vendorMobile}
                                onChange={formik.handleChange}
                            />

                        </Grid>


                        <Grid item xs={6}>

                            <TextField
                                fullWidth
                                label="Company Name"
                                name="companyName"
                                value={formik.values.companyName}
                                onChange={formik.handleChange}
                            />

                        </Grid>



                        <Grid item xs={12}>

                            <TextField
                                fullWidth
                                label="Company Address"
                                name="companyAddress"
                                value={formik.values.companyAddress}
                                onChange={formik.handleChange}
                            />

                        </Grid>


                        <Grid item xs={4}>

                            <TextField
                                fullWidth
                                label="City"
                                name="city"
                                value={formik.values.city}
                                onChange={formik.handleChange}
                            />

                        </Grid>


                        <Grid item xs={4}>

                            <TextField
                                fullWidth
                                label="State"
                                name="state"
                                value={formik.values.state}
                                onChange={formik.handleChange}
                            />

                        </Grid>


                        <Grid item xs={4}>

                            <TextField
                                fullWidth
                                label="Pincode"
                                name="pincode"
                                value={formik.values.pincode}
                                onChange={formik.handleChange}
                            />

                        </Grid>


                        <Grid item xs={12}>

                            <Box
                                sx={{
                                    mt: 2,
                                    display: "flex",
                                    justifyContent: "center"
                                }}
                            >

                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        background: "#fe7816",
                                        color: "#000",
                                        px: 5,
                                        py: 1.2,
                                        fontWeight: 600,
                                        '&:hover': {
                                            background: "#000",
                                            color: "#fe7816",
                                            border: "1px solid #fe7816"
                                        }
                                    }}
                                >

                                    Save Profile

                                </Button>

                            </Box>

                        </Grid>

                    </Grid>

                </form>


            </DialogContent>

        </Dialog>

    );

};

export default VendorProfileModal;