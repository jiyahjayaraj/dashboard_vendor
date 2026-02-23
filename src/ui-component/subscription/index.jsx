import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Paper,
  Button,
  Chip,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSubscription,
  updateSubscription,
  cancelSubscription
} from '../../container/subscription/slice';

const plans = [
  {
    name: 'basic',
    title: 'Basic',
    price: 0,
    features: ['Up to 3 Active Events', 'Basic Support']
  },
  {
    name: 'professional',
    title: 'Professional',
    price: 2999,
    features: [
      'Up to 10 Active Events',
      'Advanced Reports',
      'Priority Support',
      'Custom Branding'
    ]
  },
  {
    name: 'enterprise',
    title: 'Enterprise',
    price: 7999,
    features: [
      'Unlimited Active Events',
      'Dedicated Account Manager',
      'Full Analytics Suite',
      '24/7 Premium Support'
    ]
  }
];

const Subscription = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state) => state.subscription
  );

  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [renewalDate, setRenewalDate] = useState('');

  useEffect(() => {
    dispatch(getSubscription());
  }, [dispatch]);

  const handleUpgradeClick = (plan) => {
    setSelectedPlan(plan);
    setOpen(true);
  };

  const handleSubmitUpgrade = () => {
    dispatch(
      updateSubscription({
        plan: selectedPlan.name,
        price: selectedPlan.price,
        renewalDate
      })
    );

    setOpen(false);
    setRenewalDate('');
    setSelectedPlan(null);
  };

  const handleCancel = () => {
    dispatch(cancelSubscription());
  };

  const currentPlan = data?.plan;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" gutterBottom>
        Subscription
      </Typography>

      {/* ================= LOADING ================= */}
      {loading && <LinearProgress sx={{ mb: 3 }} />}

      {/* ================= ERROR ================= */}
      {!loading && error && (
        <Typography color="error" sx={{ mb: 3 }}>
          {typeof error === 'string'
            ? error
            : 'Failed to load subscription.'}
        </Typography>
      )}

      {/* ================= CURRENT PLAN ================= */}
      {!loading && data && (
        <Paper
          sx={{
            p: 3,
            mb: 4,
            background: '#111827',
            color: '#fff',
            borderRadius: 3
          }}
        >
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {currentPlan?.toUpperCase()} Plan
              </Typography>

              <Typography variant="body2" sx={{ mt: 1 }}>
                Renews on:{' '}
                {data?.renewalDate
                  ? new Date(data.renewalDate).toDateString()
                  : 'N/A'}
              </Typography>

              <Chip
                label={
                  data.status === 'active'
                    ? 'Active Plan'
                    : 'Cancelled'
                }
                color={
                  data.status === 'active'
                    ? 'success'
                    : 'error'
                }
                sx={{ mt: 2 }}
              />
            </Grid>

            <Grid item>
              <Typography variant="h4" sx={{ mb: 2 }}>
                ${data.price}/month
              </Typography>

              {data.status === 'active' && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancel Subscription
                </Button>
              )}
            </Grid>
          </Grid>
        </Paper>
      )}

      {/* ================= AVAILABLE PLANS ================= */}
      <Typography variant="h4" sx={{ mb: 3 }}>
        Available Plans
      </Typography>

      <Grid container spacing={3}>
        {plans.map((plan) => {
          const isCurrent =
            currentPlan && plan.name === currentPlan;

          return (
            <Grid item xs={12} md={4} key={plan.name}>
              <Paper
                sx={{
                  p: 3,
                  height: '100%',
                  borderRadius: 3,
                  background: isCurrent
                    ? '#1f2937'
                    : '#000000',
                  
                  color: '#fff'
                }}
              >
                <Typography variant="h5" sx={{ mb: 2 }}>
                  {plan.title}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  {plan.features.map((feature, i) => (
                    <Typography
                      key={i}
                      variant="body2"
                      sx={{ mb: 1 }}
                    >
                      • {feature}
                    </Typography>
                  ))}
                </Box>

                <Typography variant="h4" sx={{ mb: 2 }}>
                  {plan.price !== null
                    ? `₹${plan.price}/month`
                    : 'Contact us'}
                </Typography>

                {isCurrent ? (
                  <Button
                    variant="contained"
                    fullWidth
                    disabled
                  >
                    Current Plan
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    fullWidth
                    disabled={loading}
                    onClick={() => handleUpgradeClick(plan)}
                  >
                    Upgrade
                  </Button>
                )}
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      {/* ================= UPGRADE MODAL ================= */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Upgrade to {selectedPlan?.title}
        </DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            type="date"
            label="Renewal Date"
            InputLabelProps={{ shrink: true }}
            value={renewalDate}
            onChange={(e) => setRenewalDate(e.target.value)}
            sx={{ mt: 2 }}
            required
          />

          <TextField
            fullWidth
            label="Plan"
            value={selectedPlan?.title || ''}
            disabled
            sx={{ mt: 2 }}
          />

          <TextField
            fullWidth
            label="Price"
            value={
              selectedPlan?.price !== null
                ? `₹${selectedPlan?.price}/month`
                : 'Contact us'
            }
            disabled
            sx={{ mt: 2 }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmitUpgrade}
            disabled={!renewalDate}
          >
            Confirm Upgrade
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Subscription;
