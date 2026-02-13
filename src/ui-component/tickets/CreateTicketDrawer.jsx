import React, { useState, useEffect } from "react";
import {
    Drawer,
    Box,
    Typography,
    TextField,
    Button,
    MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createTicketRequest } from "../../container/ticketcontainer/slice";
import { getEventsRequest } from "../../container/eventContainer/slice";

const CreateTicketDrawer = ({ open, onClose }) => {
    const dispatch = useDispatch();

    // ✅ Get events from redux
    const { events } = useSelector((state) => state.event);
    const vendorId = useSelector((state) => state.login.data?._id);

    const [form, setForm] = useState({
        eventId: "",      // ✅ added
        name: "",
        price: "",
        totalQuantity: "",
        status: "ACTIVE",
    });

    // ✅ Fetch vendor events when drawer opens
    useEffect(() => {
        if (open && vendorId) {
            dispatch(getEventsRequest({ vendorId }));
        }
    }, [dispatch, open, vendorId]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        dispatch(
            createTicketRequest({
                ...form,
                price: Number(form.price),
                totalQuantity: Number(form.totalQuantity),
            })
        );

        onClose();

        setForm({
            eventId: "",
            name: "",
            price: "",
            totalQuantity: "",
            status: "ACTIVE",
        });
    };

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            variant="temporary"
            ModalProps={{ keepMounted: true }}
            sx={{
                zIndex: (theme) => theme.zIndex.modal + 1,
            }}
        >
            <Box sx={{ width: 380, p: 3 }}>
                <Typography variant="h6" mb={2}>
                    Create Ticket Type
                </Typography>

                {/* ✅ EVENT DROPDOWN */}
                <TextField
                    select
                    fullWidth
                    label="Select Event"
                    name="eventId"
                    value={form.eventId}
                    onChange={handleChange}
                    margin="normal"
                >
                    {events?.map((event) => (
                        <MenuItem key={event._id} value={event._id}>
                            {event.title}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    fullWidth
                    label="Ticket Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    margin="normal"
                />

                <TextField
                    fullWidth
                    label="Price (USD)"
                    name="price"
                    type="number"
                    value={form.price}
                    onChange={handleChange}
                    margin="normal"
                />

                <TextField
                    fullWidth
                    label="Total Quantity"
                    name="totalQuantity"
                    type="number"
                    value={form.totalQuantity}
                    onChange={handleChange}
                    margin="normal"
                />

                <TextField
                    select
                    fullWidth
                    label="Status"
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    margin="normal"
                >
                    <MenuItem value="ACTIVE">Active</MenuItem>
                    <MenuItem value="INACTIVE">Inactive</MenuItem>
                </TextField>

                <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                    <Button fullWidth variant="outlined" onClick={onClose}>
                        Cancel
                    </Button>

                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={
                            !form.eventId ||
                            !form.name ||
                            !form.price ||
                            !form.totalQuantity
                        }
                    >
                        Save
                    </Button>
                </Box>
            </Box>
        </Drawer>
    );
};

export default CreateTicketDrawer;
