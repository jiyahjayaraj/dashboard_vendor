import React, { useEffect, useState } from "react";
import "./order.css";
import { useDispatch, useSelector } from "react-redux";
import { getVendorOrdersRequest } from "../../container/orderContainer/slice";

import {
  Box,
  Typography,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Stack,
  Avatar,
  InputAdornment
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Order = () => {
  const dispatch = useDispatch();

  const { orders = [], loading, error } = useSelector(
    (state) => state.order || {}
  );

  const [search, setSearch] = useState("");

  // Fetch orders
  useEffect(() => {
    dispatch(getVendorOrdersRequest());
  }, [dispatch]);

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const customerName = order.userId?.name || "";
    return customerName.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <Box p={3} className="order-container">
      {/* HEADER */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold" fontSize={"20px"}>
            Orders
          </Typography>
          <Typography variant="body2" color="gray">
            {orders?.length || 0} orders found
          </Typography>
        </Box>
      </Stack>

      {/* SEARCH */}
      <TextField
        placeholder="Search by customer..."
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          mb: 3,
          maxWidth: 420,
          background: "#0b0b0b",
          borderRadius: "8px"
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />

      {/* TABLE */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0px 6px 18px rgba(0,0,0,0.08)"
        }}
      >
        {loading ? (
          <Box sx={{ padding: "40px", textAlign: "center" }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography sx={{ padding: "20px", color: "red" }}>
            Failed to load orders
          </Typography>
        ) : (
          <Table>
            <TableHead
              sx={{
                background: "#2b1a0f",
              }}
            >
              <TableRow>
                <TableCell><b>#</b></TableCell>
                <TableCell><b>Customer</b></TableCell>
                <TableCell><b>Date</b></TableCell>
                <TableCell><b>Event</b></TableCell>
                <TableCell><b>Amount</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order, index) => (
                  <TableRow key={order._id} hover>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar
                          sx={{
                            bgcolor: "#fe7816",
                            width: 36,
                            height: 36,
                            color: "white",
                          }}
                        >
                          {order.userId?.name?.charAt(0).toUpperCase() || "C"}
                        </Avatar>
                        <Typography fontWeight="500">
                          {order.userId?.name || "Unknown"}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {order.eventId?.eventName}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>
                      ₹ {order.totalAmount}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No Orders Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Box>
  );
};

export default Order;