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
  upgradeSubscription,
  cancelSubscription
} from '../../container/subscription/slice';

const plans = [
  {
    name: 'basic',
    title: 'Basic',
    price: 0,
    duration: 'month',
    features: ['Up to 3 Active Events', 'Basic Support']
  },
  {
    name: 'professional',
    title: 'Professional',
    price: 2999,
    duration: 'month',
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
    duration: 'year',
    features: [
      'Unlimited Active Events',
      'Dedicated Account Manager',
      'Full Analytics Suite',
      '24/7 Premium Support'
    ]
  }
];

const Subscription = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [processingPayment, setProcessingPayment] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubscription());
  }, [dispatch]);

  const { data, loading, error } = useSelector(
    (state) => state.subscription
  );

  useEffect(() => {
    console.log("🔍 SUBSCRIPTION SLICE DATA:", data);
    console.log("🔍 PLAN FIELD:", data?.plan);
  }, [data]);

  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleUpgradeClick = (plan) => {
    setSelectedPlan(plan);
    setOpen(true);
  };

  const handleSubmitUpgrade = async () => {

    if (!paymentMethod) {
      alert("Please select payment method");
      return;
    }

    setProcessingPayment(true);

    // Fake payment delay (simulate gateway)
    setTimeout(() => {

      dispatch(
        upgradeSubscription({
          plan: selectedPlan.name,
          paymentMethod
        })
      );

      setProcessingPayment(false);
      setOpen(false);
      setPaymentMethod('');
      setSelectedPlan(null);

    }, 2000);

  };

  const handleCancel = () => {
    dispatch(cancelSubscription());
  };

  const currentPlan =
    data?.plan?.toLowerCase() ?? "basic";

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6">Loading subscription…</Typography>
        <LinearProgress sx={{ mt: 2 }} />
      </Box>
    );
  }
  const price = data?.price ?? 0;
  const status = data?.status ?? "active";
  const renewalDate = data?.renewalDate ?? null;
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
      {!loading && (

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
                {renewalDate
                  ? new Date(renewalDate).toDateString()
                  : 'N/A'}
              </Typography>

              <Chip
                label={
                  status === 'active'
                    ? 'Active Plan'
                    : 'Cancelled'
                }
                color={
                  status === 'active'
                    ? 'success'
                    : 'error'
                }
                sx={{ mt: 2 }}
              />
            </Grid>

            <Grid item>
              <Typography variant="h4" sx={{ mb: 2 }}>
                ₹{price}/{currentPlan === 'enterprise' ? 'year' : 'month'}
              </Typography>

              {status === 'active' && (
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
            plan.name.toLowerCase().trim() === currentPlan;

          return (
            <Grid item xs={12} md={4} key={plan.name}>
              <Paper
                sx={{
                  p: 3,
                  height: '100%',
                  borderRadius: 3,
                  background: isCurrent
                    ? '#5c5c5c'
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
                    ? `₹${plan.price}/${plan.duration}`
                    : 'Contact us'}
                </Typography>

                {isCurrent ? (
                  <Button
                    variant="contained"
                    fullWidth
                    disabled
                    sx={{
                      bgcolor: '#63ffcb',
                      color: '#fff',
                      opacity: 1
                    }}
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
            label="Plan"
            value={selectedPlan?.title || ''}
            disabled
            sx={{ mt: 2 }}
          />

          <TextField
            fullWidth
            label="Price"
            value={`₹${selectedPlan?.price}/${selectedPlan?.duration}`}
            disabled
            sx={{ mt: 2 }}
          />

          {/* PAYMENT METHODS */}
          <Typography sx={{ mt: 3, mb: 1 }}>
            Select Payment Method
          </Typography>

          <Grid container spacing={2}>

            <Grid item xs={6}>
              <Button
                variant={paymentMethod === "card" ? "contained" : "outlined"}
                fullWidth
                onClick={() => setPaymentMethod("card")}
              >
                Card
              </Button>
            </Grid>

            <Grid item xs={6}>
              <Button
                variant={paymentMethod === "upi" ? "contained" : "outlined"}
                fullWidth
                onClick={() => setPaymentMethod("upi")}
              >
                UPI
              </Button>
            </Grid>

            <Grid item xs={6}>
              <Button
                variant={paymentMethod === "netbanking" ? "contained" : "outlined"}
                fullWidth
                onClick={() => setPaymentMethod("netbanking")}
              >
                NetBanking
              </Button>
            </Grid>

            <Grid item xs={6}>
              <Button
                variant={paymentMethod === "wallet" ? "contained" : "outlined"}
                fullWidth
                onClick={() => setPaymentMethod("wallet")}
              >
                Wallet
              </Button>
            </Grid>

          </Grid>

        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmitUpgrade}
            disabled={!paymentMethod || processingPayment}
          >

            {processingPayment
              ? "Processing Payment..."
              : "Pay & Upgrade"}

          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Subscription;
