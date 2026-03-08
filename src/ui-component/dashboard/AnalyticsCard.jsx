import React from "react";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getVendorOrdersRequest } from "container/orderContainer/slice";
import { getEventsRequest } from "container/eventContainer/slice";
import { getVendorFeedbacks } from "container/RatingContainer/slice";

import {
  CalendarOutlined,
  DollarOutlined,
  EyeOutlined,
  ClockCircleOutlined
} from "@ant-design/icons";

import Card from "./card";

const AnalyticsCard = () => {
  const user = useSelector((state) => state?.login?.userData || {});
  const vendorId = user?._id;

  const events = useSelector((state) => state.event?.events || []);
  const ratings = useSelector((state) => state.rating?.list || []);
  const orders = useSelector((state) => state.order?.orders || []);

  const dispatch = useDispatch();

useEffect(() => {
  if (vendorId) {
    dispatch(getVendorOrdersRequest({ vendorId }));
    dispatch(getEventsRequest({ vendorId }));
    dispatch(getVendorFeedbacks({ vendorId }));
  }
}, [dispatch, vendorId]);

  /* ====== CALCULATIONS ====== */

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

  return (
    <Grid container item xs={12} spacing={2.5}>
      <Grid item xs={12}>
        <Grid container spacing={2.5}>

          {/* TOTAL EVENTS */}
          <Grid item xs={12} sm={6} md={3}>
            <Link to="/events" style={{ textDecoration: "none" }}>
              <Card
                title="Total Events"
                count={totalEvents}
                color="#d0d7e4"
                bgTheme="#000000"
                icon={<CalendarOutlined />}
              />
            </Link>
          </Grid>

          {/* TOTAL REVENUE */}
          <Grid item xs={12} sm={6} md={3}>
            <Link to="/tickets" style={{ textDecoration: "none" }}>
              <Card
                title="Total Revenue"
                count={`₹${totalRevenue}`}
                color="#d0d7e4"
                bgTheme="#000000"
                icon={<DollarOutlined />}
              />
            </Link>
          </Grid>

          {/* ACTIVE EVENTS */}
          <Grid item xs={12} sm={6} md={3}>
            <Link to="/events" style={{ textDecoration: "none" }}>
              <Card
                title="Active Events"
                count={activeEvents}
                color="#d0d7e4"
                bgTheme="#000000"
                icon={<ClockCircleOutlined />}
              />
            </Link>
          </Grid>

          {/* AVERAGE RATING */}
          <Grid item xs={12} sm={6} md={3}>
            <Link to="/rating" style={{ textDecoration: "none" }}>
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
      </Grid>
    </Grid>
  );
};

export default AnalyticsCard;