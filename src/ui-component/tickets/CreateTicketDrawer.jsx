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
import { createTicketRequest, updateTicketRequest, getTicketsRequest } from "../../container/ticketcontainer/slice";
import { getEventsRequest } from "../../container/eventContainer/slice";

const CreateTicketDrawer = ({ open, onClose, ticketData }) => {
    console.log("🔥 CreateTicketDrawer rendered");
    const dispatch = useDispatch();
    const eventState = useSelector((state) => state.event);

    useEffect(() => {
        console.log("🧠 event redux state:", eventState);
    }, [eventState]);

    useEffect(() => {
        console.log("EDIT ticketData:", ticketData);
    }, [ticketData]);

    // ✅ Get events from redux
    const rawEvents = useSelector((state) => state.event.events);


    const events = Array.isArray(rawEvents)
        ? rawEvents
        : rawEvents?.events ||
        rawEvents?.data?.events ||
        [];

    console.log("events array:", events);
    console.log("first event:", events?.[0]);


    const vendorId = useSelector((state) => state.login.userData?._id);

    const [form, setForm] = useState({
        eventId: "",      // ✅ added
        name: "",
        price: "",
        totalQuantity: "",
        status: "ACTIVE",
    });
    useEffect(() => {
        if (ticketData) {
            setForm({
                eventId: ticketData.eventId?._id || ticketData.eventId || "",
                name: ticketData.name || "",
                price: ticketData.price || "",
                totalQuantity: ticketData.totalQuantity || "",
                status: ticketData.status || "ACTIVE",
            });
        }
    }, [ticketData]);
    useEffect(() => {
        if (!open) {
            setForm({
                eventId: "",
                name: "",
                price: "",
                totalQuantity: "",
                status: "ACTIVE",
            });
        }
    }, [open]);


    useEffect(() => {
        console.log("vendorId:", vendorId);
        console.log("Drawer open:", open);
    }, [vendorId, open]);


    // ✅ Fetch vendor events when drawer opens
    useEffect(() => {
        if (open && vendorId) {
            dispatch(getEventsRequest({ vendorId }));
        }
    }, [dispatch, open, vendorId]);


    const handleChange = (e) => {
        console.log("changing:", e.target.name, e.target.value);
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (!form.eventId) {
            alert("Please select an event");
            return;
        }

        const payload = {
            ...form,
            price: Number(form.price),
            totalQuantity: Number(form.totalQuantity),
        };

        if (ticketData) {
            // ✅ UPDATE
            dispatch(
                updateTicketRequest({
                    ticketTypeId: ticketData._id,
                    data: payload,
                    eventId: payload.eventId,
                })
            );

        } else {
            // ✅ CREATE
            dispatch(createTicketRequest(payload));
        }

        setForm({
            eventId: "",
            name: "",
            price: "",
            totalQuantity: "",
            status: "ACTIVE",
        });
        console.log("ticketData at submit:", ticketData);
        console.log("ticketData._id:", ticketData?._id);
        onClose();
    };

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            variant="temporary"
            ModalProps={{ keepMounted: true }}
        >
            <Box sx={{ width: 380, p: 3 }}>
                <Typography variant="h6" mb={2}>
                    {ticketData ? "Edit Ticket Type" : "Create Ticket Type"}
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
                    {events.length > 0 ? (
                        events.map((event) => (
                            <MenuItem key={event._id} value={event._id}>
                                {event.eventName}
                            </MenuItem>

                        ))
                    ) : (
                        <MenuItem disabled>No events found</MenuItem>
                    )}
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
