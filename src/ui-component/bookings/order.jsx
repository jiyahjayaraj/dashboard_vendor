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
  CircularProgress
} from "@mui/material";

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
    <Box className="order-container">

      {/* Header */}
      <Box className="order-header">
        <Typography variant="h5">
          Orders
        </Typography>

        <Typography variant="body2">
          Manage and track customer bookings
        </Typography>
      </Box>

      {/* Search */}
      <Box className="order-controls">
        <TextField
          size="small"
          placeholder="Search by customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          variant="outlined"
        />
      </Box>

      {/* Table */}
      <Paper className="order-table" elevation={0}>

        {loading ? (
          <Box sx={{ padding: "20px", textAlign: "center" }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography sx={{ padding: "20px", color: "red" }}>
            Failed to load orders
          </Typography>
        ) : (
          <TableContainer>
            <Table>

              <TableHead>
                <TableRow>
                  <TableCell>Sl No</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Event</TableCell>
                  <TableCell>Amount</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order, index) => (
                    <TableRow key={order._id} hover>

                      <TableCell>{index + 1}</TableCell>

                      <TableCell>
                        {order.userId?.name || "Unknown"}
                      </TableCell>

                      <TableCell>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </TableCell>

                      <TableCell>
                        {order.eventId?.eventName}
                      </TableCell>

                      <TableCell>
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
          </TableContainer>
        )}
      </Paper>

    </Box>
  );
};

export default Order;