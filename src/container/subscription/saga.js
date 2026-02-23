import { takeEvery, call, put, select } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import commonApi from '../api';
import appConfig from '../../config';
import * as actionType from './slice';


function* getAuthToken() {
  return localStorage.getItem('token');
}

function* getSubscriptionSaga() {
  try {
    const token = yield call(getAuthToken);

    if (!token) {
      yield put(actionType.getSubscriptionSuccess(null));
      return;
    }

    const params = {
      api: `${appConfig.ip}/api/subscription`,
      method: 'GET',
      authorization: 'Bearer',
      token
    };

    const res = yield call(commonApi, params);

    yield put(
      actionType.getSubscriptionSuccess(res?.data?.data ?? null)
    );
  } catch (error) {
    yield put(
      actionType.getSubscriptionFail(
        error?.message || 'Failed to fetch subscription'
      )
    );
  }
}

function* updateSubscriptionSaga(action) {
  try {
    const token = yield call(getAuthToken);
    if (!token) {
      yield call(toast.error, 'Please login to update subscription');

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

    yield put(
      actionType.updateSubscriptionSuccess(res?.data?.data)
    );

    yield call(toast.success,'Plan updated successfully')

    
    yield put(actionType.getSubscription());
  } catch (error) {
    yield put(
      actionType.updateSubscriptionFail(
        error?.message || 'Update failed'
      )
    );

    yield call(toast.error,'Failed to update plan')
  }
}

function* cancelSubscriptionSaga() {
  try {
    const token = yield call(getAuthToken);
    if (!token) {
       yield call(toast.error, 'Please login to cancel subscription');
      return;
    }

    const params = {
      api: `${appConfig.ip}/api/subscription/cancel`,
      method: 'PUT',
      authorization: 'Bearer',
      token
    };

    const res = yield call(commonApi, params);

    yield put(
      actionType.cancelSubscriptionSuccess(res?.data?.data)
    );

    toast.success('Subscription cancelled', {
      autoClose: 3000
    });

    // Refresh subscription
    yield put(actionType.getSubscription());
  } catch (error) {
    yield put(
      actionType.cancelSubscriptionFail(
        error?.message || 'Cancel failed'
      )
    );

    toast.error('Failed to cancel subscription', {
      autoClose: 3000
    });
  }
}


export default function* SubscriptionWatcher() {
  yield takeEvery(
    actionType.getSubscription.type,
    getSubscriptionSaga
  );

  yield takeEvery(
    actionType.updateSubscription.type,
    updateSubscriptionSaga
  );

  yield takeEvery(
    actionType.cancelSubscription.type,
    cancelSubscriptionSaga
  );
}
