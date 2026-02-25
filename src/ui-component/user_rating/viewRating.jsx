// import {
//   Box,
//   Typography,
//   IconButton,
//   Grid,
//   Card,
//   CardContent,
//   Stack,
//   Avatar,
//   Paper,
//   Divider
// } from '@mui/material';
// import Drawer from '@mui/material/Drawer';
// import CloseIcon from '@mui/icons-material/Close';
// import BusinessIcon from '@mui/icons-material/Business';
// import PersonIcon from '@mui/icons-material/Person';
// import StarIcon from '@mui/icons-material/Star';
// import StarBorderIcon from '@mui/icons-material/StarBorder';

// const ViewRatingDetail = ({ drawerOpen, setDrawerOpen, item }) => {
//   const renderStars = (rating = 0) => (
//     <Stack direction="row" spacing={0.5}>
//       {[1,2,3,4,5].map(i =>
//         i <= rating
//           ? <StarIcon key={i} sx={{ color: '#FFD700' }} />
//           : <StarBorderIcon key={i} sx={{ color: '#FFD700' }} />
//       )}
//     </Stack>
//   );

//   return (
//     <Drawer
//       anchor="right"
//       open={drawerOpen}
//       onClose={() => setDrawerOpen(false)}
//       PaperProps={{ sx: { width: { xs: '100%', md: 700 } } }}
//     >
//       <Box p={3}>
//         {/* Header */}
//         <Box display="flex" justifyContent="space-between" alignItems="center">
//           <Typography variant="h3" fontWeight={700}>
//             Feedback Details
//           </Typography>
//           <IconButton onClick={() => setDrawerOpen(false)}>
//             <CloseIcon />
//           </IconButton>
//         </Box>

//         <Divider sx={{ my: 2 }} />

//         {renderStars(item?.starRating)}

//         {/* Facility Info */}
//         <Card sx={{ mt: 3 }}>
//           <CardContent>
//             <Stack direction="row" spacing={1} alignItems="center" mb={1}>
//               <Avatar><BusinessIcon /></Avatar>
//               <Typography variant="h5">Facility</Typography>
//             </Stack>

//             <Typography><b>ID:</b> {item?.facilityId}</Typography>
//             <Typography><b>Title:</b> {item?.facilityTitle}</Typography>
//           </CardContent>
//         </Card>

//         {/* Comment */}
//         <Paper sx={{ p: 2, mt: 3, borderLeft: '4px solid #34699c' }}>
//           <Typography variant="subtitle2">User Comment</Typography>
//           <Typography fontWeight={500}>{item?.comments}</Typography>
//         </Paper>

//         {/* Audit */}
//         <Card sx={{ mt: 3 }}>
//           <CardContent>
//             <Stack direction="row" spacing={1} alignItems="center" mb={1}>
//               <Avatar><PersonIcon /></Avatar>
//               <Typography variant="h5">Audit Trail</Typography>
//             </Stack>

//             <Grid container spacing={2}>
//               <Grid item xs={6}>
//                 <Typography variant="body2">Created By</Typography>
//                 <Typography>{item?.createdBy || 'N/A'}</Typography>
//               </Grid>
//               <Grid item xs={6}>
//                 <Typography variant="body2">Modified By</Typography>
//                 <Typography>{item?.modifiedBy || 'N/A'}</Typography>
//               </Grid>
//             </Grid>
//           </CardContent>
//         </Card>
//       </Box>
//     </Drawer>
//   );
// };

// export default ViewRatingDetail;