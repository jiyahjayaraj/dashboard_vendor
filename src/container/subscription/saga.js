import { takeEvery, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import commonApi from '../api';
import appConfig from '../../config';
import {
  getSubscription,
  getSubscriptionSuccess,
  getSubscriptionFail,
  updateSubscription,
  updateSubscriptionSuccess,
  updateSubscriptionFail,
  cancelSubscription,
  cancelSubscriptionSuccess,
  cancelSubscriptionFail
} from './slice';

function* getAuthToken() {
  return localStorage.getItem('token');
}

/* ================= GET SUBSCRIPTION ================= */
function* getSubscriptionSaga() {
  try {
    const token = yield call(getAuthToken);

    if (!token) {
      yield put(getSubscriptionSuccess(null));
      return;
    }

    const params = {
      api: `${appConfig.ip}/api/subscription`,
      method: 'GET',
      authorization: 'Bearer',
      token
    };

    const res = yield call(commonApi, params);
    const subscription = res?.data?.data ?? null;

    yield put(getSubscriptionSuccess(subscription));
  } catch (error) {
    yield put(
      getSubscriptionFail(
        error?.message || 'Failed to fetch subscription'
      )
    );
  }
}

/* ================= UPDATE SUBSCRIPTION ================= */
function* updateSubscriptionSaga(action) {
  try {
    const token = yield call(getAuthToken);

    if (!token) {
      toast.error('Please login to update subscription');
      return;
    }

    const params = {
      api: `${appConfig.ip}/api/subscription/update`,
      method: 'PUT',
      authorization: 'Bearer',
      token,
      body: action.payload
    };

    const res = yield call(commonApi, params);
    const subscription = res?.data?.data ?? null;

    yield put(updateSubscriptionSuccess(subscription));
    toast.success('Plan updated successfully');

    // Refresh subscription safely
    yield put(getSubscription());
  } catch (error) {
    yield put(
      updateSubscriptionFail(
        error?.message || 'Update failed'
      )
    );
    toast.error('Failed to update plan');
  }
}

/* ================= CANCEL SUBSCRIPTION ================= */
function* cancelSubscriptionSaga() {
  try {
    const token = yield call(getAuthToken);

    if (!token) {
      toast.error('Please login to cancel subscription');
      return;
    }

    const params = {
      api: `${appConfig.ip}/api/subscription/cancel`,
      method: 'PUT',
      authorization: 'Bearer',
      token
    };

    const res = yield call(commonApi, params);
    const subscription = res?.data?.data ?? null;

    yield put(cancelSubscriptionSuccess(subscription));
    toast.success('Subscription cancelled');

    yield put(getSubscription());
  } catch (error) {
    yield put(
      cancelSubscriptionFail(
        error?.message || 'Cancel failed'
      )
    );
    toast.error('Failed to cancel subscription');
  }
}

/* ================= WATCHER ================= */
export default function* SubscriptionWatcher() {
  yield takeEvery(getSubscription.type, getSubscriptionSaga);
  yield takeEvery(updateSubscription.type, updateSubscriptionSaga);
  yield takeEvery(cancelSubscription.type, cancelSubscriptionSaga);
}