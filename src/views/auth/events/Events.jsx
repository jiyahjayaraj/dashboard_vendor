import { Typography, Box } from '@mui/material';

const Events = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" color="primary.main">
        Events
      </Typography>

      <Typography sx={{ mt: 2 }}>
        This is Events page
      </Typography>
    </Box>
  );
};

export default Events;
