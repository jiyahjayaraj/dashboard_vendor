import React, { useEffect, useState, useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  TableContainer,
  Table,
  TextField,
  InputAdornment,
  Grid,
  Typography,
  Box,
  Paper,
  Stack,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Delete } from '@mui/icons-material';

// Redux
import { getVendorFeedbacks, deleteFeedback } from 'container/RatingContainer/slice';
import { getEventsRequest } from 'container/eventContainer/slice';

export default function UserRating() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const vendorId = useSelector((state) => state.login?.userData?._id);
  const events = useSelector((state) => state.event?.events || []);
  const ratingsList = useSelector((state) => state.rating?.list || []);
  const avgRating = useSelector((state) => state.rating?.avgRating || 0);
  
  const [searchQuery, setSearchQuery] = useState('');

  /* =========================
     FETCH DATA
  ========================= */
  useEffect(() => {
    dispatch(getVendorFeedbacks());
  }, [dispatch]);

  useEffect(() => {
    if (vendorId) {
      dispatch(getEventsRequest({ vendorId }));
    }
  }, [dispatch, vendorId]);

  /* =========================
     STAR RENDER
  ========================= */
  const renderStars = (rating = 0) => (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {[1, 2, 3, 4, 5].map((i) =>
        i <= rating ? (
          <StarIcon key={i} sx={{ color: '#ff7a00', fontSize: 18 }} />
        ) : (
          <StarBorderIcon key={i} sx={{ color: '#ff7a00', fontSize: 18 }} />
        )
      )}
    </Box>
  );

  /* =========================
     FILTER
  ========================= */
  const filteredList = useMemo(() => {
    return ratingsList.filter((item) => {
      const matchedEvent = events.find(
        (ev) => String(ev._id) === String(item.eventId)
      );

      const commentMatch =
        item.comment?.toLowerCase().includes(searchQuery.toLowerCase());

      const eventMatch =
        matchedEvent?.eventName
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase());

      return commentMatch || eventMatch;
    });
  }, [ratingsList, events, searchQuery]);

  const displayedData = filteredList.map((item) => {
    const matchedEvent = events.find(
      (ev) => String(ev._id) === String(item.eventId)
    );

    return {
      _id: item._id || item.feedbackId || item.id,
      rating: item.rating,
      comment: item.comment,
      eventId: item.eventId,
      createdAt: item.createdAt,
      eventName: matchedEvent?.eventName || "Unknown Event"
    };
  });

  const handleDelete = (row) => {
    const feedbackId = row?._id;
    const eventId = row?.eventId;

    if (feedbackId && eventId && window.confirm("Delete this feedback?")) {
      dispatch(deleteFeedback({ eventId, feedbackId }));
    }
  };

  return (
    <Box p={3}>
      {/* HEADER */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold" fontSize={"20px"}>
            Ratings & Feedback
          </Typography>
          <Typography variant="body2" color="gray">
            {displayedData?.length || 0} feedbacks found
          </Typography>
        </Box>
      </Stack>

      {/* SUMMARY CARDS */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              p: 2.5,
              borderRadius: 2,
              border: `1px solid ${theme.palette.primary.main}40`,
              background: "#1e1e1e"
            }}
          >
            <Typography variant="h3" fontWeight={700}>
              {Number(avgRating || 0).toFixed(1)}
            </Typography>
            <Box mb={1}>{renderStars(Math.round(avgRating || 0))}</Box>
            <Typography variant="body2" color="gray">
              Average Rating
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* SEARCH */}
      <TextField
        placeholder="Search by event or comment..."
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
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
        <Table>
          <TableHead
            sx={{
              background: "#2b1a0f",
            }}
          >
            <TableRow>
              <TableCell><b>#</b></TableCell>
              <TableCell><b>Rating</b></TableCell>
              <TableCell><b>Event Name</b></TableCell>
              <TableCell><b>Comment</b></TableCell>
              <TableCell><b>Action</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {displayedData.length > 0 ? (
              displayedData.map((row, index) => (
                <TableRow key={row._id} hover>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {renderStars(row.rating)}
                  </TableCell>
                  <TableCell>
                    {row.eventName}
                  </TableCell>
                  <TableCell sx={{ maxWidth: 300, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {row.comment}
                  </TableCell>
                  <TableCell>
                    <Button
                      startIcon={<Delete />}
                      size="small"
                      color="error"
                      onClick={() => handleDelete(row)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No Feedback Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}