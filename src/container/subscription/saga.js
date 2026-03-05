import { takeEvery, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import commonApi from '../api';
import appConfig from '../../config';
import {
  getSubscription,
  getSubscriptionSuccess,
  getSubscriptionFail,
  upgradeSubscription,
  upgradeSubscriptionSuccess,
  upgradeSubscriptionFail,
  cancelSubscription,
  cancelSubscriptionSuccess,
  cancelSubscriptionFail
} from './slice';

function getAuthToken() {
  return Cookies.get('token');
}

/* GET SUBSCRIPTION */
function* getSubscriptionSaga() {
  try {
    const token = getAuthToken();

    const params = {
      api: `${appConfig.ip}/api/subscription`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const res = yield call(commonApi, params);

    yield put(getSubscriptionSuccess(res.data));

  } catch (error) {
    yield put(getSubscriptionFail(error?.message || 'Failed to fetch subscription'));
  }
}

/* UPGRADE SUBSCRIPTION */
function* upgradeSubscriptionSaga(action) {
  try {

    const token = getAuthToken();

    const params = {
      api: `${appConfig.ip}/api/subscription/upgrade`,
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: action.payload
    };

    const res = yield call(commonApi, params);

    yield put(upgradeSubscriptionSuccess(res?.data?.data));

    toast.success('Plan upgraded successfully');

    yield put(getSubscription());

  } catch (error) {

    yield put(upgradeSubscriptionFail(error?.message || 'Upgrade failed'));

    toast.error('Failed to upgrade plan');

  }
}

/* CANCEL SUBSCRIPTION */
function* cancelSubscriptionSaga() {
  try {

    const token = getAuthToken();

    const params = {
      api: `${appConfig.ip}/api/subscription/cancel`,
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const res = yield call(commonApi, params);

    yield put(cancelSubscriptionSuccess(res?.data?.data));

    toast.success('Subscription cancelled');

    yield put(getSubscription());

  } catch (error) {

    yield put(cancelSubscriptionFail(error?.message || 'Cancel failed'));

    toast.error('Failed to cancel subscription');

  }
}

/* WATCHER */
export default function* SubscriptionWatcher() {
  yield takeEvery(getSubscription.type, getSubscriptionSaga);
  yield takeEvery(upgradeSubscription.type, upgradeSubscriptionSaga);
  yield takeEvery(cancelSubscription.type, cancelSubscriptionSaga);
}