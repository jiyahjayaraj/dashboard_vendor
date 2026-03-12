import React, { useEffect } from "react";
import { Grid, Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  CalendarOutlined,
  DollarOutlined,
  EyeOutlined,
  ClockCircleOutlined
} from "@ant-design/icons";

import { getVendorOrdersRequest } from "container/orderContainer/slice";
import { getEventsRequest } from "container/eventContainer/slice";
import { getVendorFeedbacks } from "container/RatingContainer/slice";

import Card from "./card";

const AnalyticsCard = () => {

  const dispatch = useDispatch();

  const user = useSelector((state) => state?.login?.userData || {});
  const vendorId = user?._id;

  const events = useSelector((state) => state.event?.events || []);
  const ratings = useSelector((state) => state.rating?.list || []);
  const orders = useSelector((state) => state.order?.orders || []);

  useEffect(() => {
    if (vendorId) {
      dispatch(getVendorOrdersRequest({ vendorId }));
      dispatch(getEventsRequest({ vendorId }));
      dispatch(getVendorFeedbacks({ vendorId }));
    }
  }, [dispatch, vendorId]);

  /* ===== CALCULATIONS ===== */

  const totalEvents = events.length;

  const activeEvents = events.filter(
    (e) => new Date(e.eventDate) >= new Date()
  ).length;

  const totalRevenue = orders.reduce(
    (sum, order) => sum + (order.totalAmount || 0),
    0
  );

  const averageRating =
    ratings.length > 0
      ? (
          ratings.reduce((sum, r) => sum + (r.rating || 0), 0) /
          ratings.length
        ).toFixed(1)
      : 0;

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <Box>

      {/* ===== DASHBOARD CARDS ===== */}
      <Grid container spacing={2.5}>

        <Grid item xs={12} sm={6} md={3}>
          <Link to="/events" style={{ textDecoration: "none", color: "inherit" }}>
            <Card
              title="Total Events"
              count={totalEvents}
              color="#d0d7e4"
              bgTheme="#000000"
              icon={<CalendarOutlined />}
            />
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Link to="/bookings" style={{ textDecoration: "none", color: "inherit" }}>
            <Card
              title="Total Revenue"
              count={`₹${totalRevenue}`}
              color="#d0d7e4"
              bgTheme="#000000"
              icon={<DollarOutlined />}
            />
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Link to="/events" style={{ textDecoration: "none", color: "inherit" }}>
            <Card
              title="Active Events"
              count={activeEvents}
              color="#d0d7e4"
              bgTheme="#000000"
              icon={<ClockCircleOutlined />}
            />
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Link to="/rating" style={{ textDecoration: "none", color: "inherit" }}>
            <Card
              title="Average Rating"
              count={averageRating}
              color="#d0d7e4"
              bgTheme="#000000"
              icon={<EyeOutlined />}
            />
          </Link>
        </Grid>

      </Grid>

      {/* ===== RECENT BOOKINGS TABLE ===== */}
      <Box sx={{ mt: 4 }}>

        <Typography variant="h6" sx={{ mb: 2 }}>
          Recent Bookings
        </Typography>

        <Paper elevation={0} sx={{ borderRadius: 2 }}>
          <TableContainer>
            <Table>

              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Event</TableCell>
                  <TableCell>Amount</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {recentOrders.length > 0 ? (
                  recentOrders.map((order, index) => (
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
                      No Recent Bookings
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>

            </Table>
          </TableContainer>
        </Paper>

      </Box>

    </Box>
  );
};

export default AnalyticsCard;