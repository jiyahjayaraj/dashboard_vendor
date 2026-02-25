import { useEffect, useState } from 'react';
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

  const [page, setPage] = useState(0);
  const [limit] = useState(20);
  const [searchQuery, setSearchQuery] = useState('');

  // Redux state
  const ratingsList = useSelector((state) => state.rating.list);
  const count = useSelector((state) => state.rating.listCount);
  const avgRating = useSelector((state) => state.rating.avgRating);

  const { config, keys } = userRating;

  /* =========================
     FETCH VENDOR FEEDBACKS
  ========================= */
  useEffect(() => {
    dispatch(getVendorFeedbacks());
  }, [dispatch]);

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
  const filteredList = ratingsList.filter((item) =>
    item.comment?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedData = filteredList.slice(
    page * limit,
    page * limit + limit
  );

  const displayedData = paginatedData.map((item) => ({
  ...item,
  comments: item.comment,
  starRating: renderStars(item.rating)
}));
  const handleDelete = (row) => {
    if (window.confirm("Delete this feedback?")) {
      dispatch(deleteFeedback(row._id));
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

      {/* Summary Card */}
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
              {avgRating || 0}
            </Typography>
            <Box>{renderStars(Math.round(avgRating))}</Box>
            <Typography variant="body2">Average Rating</Typography>
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
            data={displayedData}   // IMPORTANT change
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