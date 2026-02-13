import React from 'react';
import { Grid, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { blueGrey } from '@mui/material/colors';
import { TagsOutlined, DollarOutlined, CalendarOutlined , EyeOutlined  } from '@ant-design/icons';
import Card from './card';
// import { DetailCard } from './DetailCard';
import { ClockCircleOutlined } from '@ant-design/icons';



const AnalyticsCard = () => {
  const facilityList = useSelector((state) => state.facility?.list || []);
  const issueList = useSelector((state) => state.reportIssue?.list || []);
  const feedbackList = useSelector((state) => state.rating?.list || []);
  const usersList = useSelector((state) => state.user?.list || []);
  const dashCount = useSelector((state) => state?.dashboard?.dashCount);
  const draftFacilities = useSelector((state) => state.facility?.draftList || []);

  const draftCount = draftFacilities.length;

  console.log('FacilityList in Dashboar = ', facilityList);

  const counts = {
    facilities: useSelector((state) => state.facility?.listCount || 0),
    issues: useSelector((state) => state.reportIssue?.listCount || 0),
    feedback: useSelector((state) => state?.rating?.listCount || 0),
    users: useSelector((state) => state.user?.listCount || 0)
  };


  return (
    <Grid container item xs={12} spacing={2.5}>
  <Grid item xs={12}>
    <Grid container spacing={2.5}>
      
      <Grid item xs={12} sm={6} md={3}>
        <Link to="/userManagment" style={{ textDecoration: 'none' }}>
          <Card
            title="Total Ticket Sold"
            count={12000}
            color="#d0d7e4"
            bgTheme="#000000"
            icon={<TagsOutlined />}
          />
        </Link>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Link to="/facility" style={{ textDecoration: 'none' }}>
          <Card
            title="Active Facilities"
            count={10}
            color="#d0d7e4"
            bgTheme="#000000"
            icon={<DollarOutlined />}
          />
        </Link>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Link to="/reportedIssues" style={{ textDecoration: 'none' }}>
          <Card
            title="Open Issues"
            count={11}
            color="#d0d7e4"
            bgTheme="#000000"
            icon={<CalendarOutlined />}
          />
        </Link>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Link to="/rating" style={{ textDecoration: 'none' }}>
          <Card
            title="Feedback"
            count={200}
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
