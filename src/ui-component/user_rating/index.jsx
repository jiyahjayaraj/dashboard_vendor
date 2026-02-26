import { useEffect, useState, useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  TableContainer,
  Table,
  TextField,
  InputAdornment,
  Grid,
  Typography,
  Box
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

// Redux
import { getVendorFeedbacks, deleteFeedback } from 'container/RatingContainer/slice';
import { getEventsRequest } from 'container/eventContainer/slice';

// Table config
import { userRating } from 'utils/TableConfig';

// Components
import MainCard from 'ui-component/cards/MainCard';
import Pagination from 'utils/TablePagination';
import TableHead from 'utils/TableHead';
import TableRows from 'utils/TableRows';

export default function UserRating() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const vendorId = useSelector((state) => state.login?.userData?._id);
  const events = useSelector((state) => state.event?.events || []);
  const ratingsList = useSelector((state) => state.rating?.list || []);
  const avgRating = useSelector((state) => state.rating?.avgRating || 0);
  
  const [page, setPage] = useState(0);
  const limit = 20;
  const [searchQuery, setSearchQuery] = useState('');

  const { config, keys } = userRating;

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
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
     FILTER + PAGINATION
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

  const paginatedData = filteredList.slice(
    page * limit,
    page * limit + limit
  );

  const displayedData = paginatedData.map((item) => {
    const matchedEvent = events.find(
      (ev) => String(ev._id) === String(item.eventId)
    );

    return {
      _id: item._id || item.feedbackId || item.id,
      rating: item.rating,
      comment: item.comment,
      eventId: item.eventId,
      createdAt: item.createdAt,
      starRating: renderStars(item.rating),
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

  const countPagination = Math.ceil(filteredList.length / limit);

  return (
    <MainCard>
      {/* Header */}
      <Typography variant="h2" fontWeight={600} mb={2}>
        <i className="fa-solid fa-star" style={{ color: '#ff7a00' }} />{' '}
        Ratings & Feedback
      </Typography>

      {/* Summary */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              p: 2.5,
              borderRadius: 2,
              border: `1px solid ${theme.palette.primary.main}40`
            }}
          >
            <Typography variant="h3" fontWeight={700}>
              {avgRating}
            </Typography>
            <Box>{renderStars(Math.round(avgRating))}</Box>
            <Typography variant="body2">
              Average Rating
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Search */}
      <TextField
        fullWidth
        size="small"
        placeholder="Search by event or comment"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setPage(0);
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />

      {/* Table */}
      <TableContainer sx={{ mt: 2, borderRadius: 2 }}>
        <Table>
          <TableHead keys={keys} config={config} />
          <TableRows
            data={displayedData}
            keys={keys}
            config={config}
            handleDeleteModal={handleDelete}
          />
        </Table>
      </TableContainer>

      {/* Pagination */}
      {countPagination > 1 && (
        <Box mt={3} display="flex" justifyContent="center">
          <Pagination
            page={page}
            countPagination={countPagination}
            handlePageClick={(e) => setPage(e.selected)}
          />
        </Box>
      )}
    </MainCard>
  );
}