import React, { useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from 'recharts';

import { useDispatch, useSelector } from 'react-redux';
import { revenueRequest } from '../../container/revenueContainer/slice';

const RevenueReports = () => {
  const dispatch = useDispatch();

  const { summary, overview, earnings, loading } =
    useSelector((state) => state.revenue);

  useEffect(() => {
    dispatch(
      revenueRequest({
        startDate: '2024-04-01',
        endDate: '2024-04-30'
      })
    );
  }, [dispatch]);

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Revenue Reports
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={4}>
          <Paper sx={cardStyle}>
            <Typography variant="subtitle1">Total Revenue</Typography>
            <Typography variant="h5">
              ₹{summary?.totalRevenue || 0}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={cardStyle}>
            <Typography variant="subtitle1">Total Tickets Sold</Typography>
            <Typography variant="h5">
              {summary?.ticketsSold || 0}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={cardStyle}>
            <Typography variant="subtitle1">Processing Fees</Typography>
            <Typography variant="h5">
              ₹{summary?.processingFees || 0}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Revenue Overview Chart */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" mb={2}>
          Revenue Overview
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={overview}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#00C49F" />
              <Line type="monotone" dataKey="tickets" stroke="#FFBB28" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </Paper>

      {/* Earnings Table */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>
          Earnings by Event
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Event</TableCell>
                <TableCell align="right">Tickets Sold</TableCell>
                <TableCell align="right">Total Revenue</TableCell>
                <TableCell align="right">Processing Fees</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {earnings?.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.eventName}</TableCell>
                  <TableCell align="right">
                    {row.ticketsSold}
                  </TableCell>
                  <TableCell align="right">
                    ₹{row.totalRevenue}
                  </TableCell>
                  <TableCell align="right">
                    ₹{row.processingFees}
                  </TableCell>
                </TableRow>
              ))}

              {!earnings?.length && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No Data Available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

const cardStyle = {
  p: 3,
  borderRadius: 2,
  background: '#1E1E2D',
  color: '#fff'
};

export default RevenueReports;
