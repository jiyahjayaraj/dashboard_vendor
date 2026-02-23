import { takeEvery, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import commonApi from '../api';
import appConfig from '../../config';
import * as actionType from './slice';

function* revenue(action) {
  try {
    const { startDate, endDate } = action.payload;

    const params = {
      api: `${appConfig.ip}/api/organizer/revenue?startDate=${startDate}&endDate=${endDate}`,
      method: 'GET',
      successAction: actionType.revenueSuccess(),
      failAction: actionType.revenueFail(),
      authorization: null // using cookie auth
    };

    const res = yield call(commonApi, params);

    if (res) {
      yield put(actionType.revenueSuccess(res));
    } else {
      yield put(
        actionType.revenueFail({
          message: 'Failed to fetch revenue'
        })
      );
      yield call(toast.error, 'Failed to fetch revenue', { autoClose: 3000 });
    }

  } catch (error) {
    console.error('Revenue fetch failed:', error);

    yield put(
      actionType.revenueFail({
        message: error.message || 'Revenue fetch failed',
        status: error.response?.status || 5000
      })
    );

    yield call(toast.error, 'Revenue fetch failed', { autoClose: 3000 });
  }
}

export default function* RevenueWatcher() {
  yield takeEvery(actionType.revenueRequest, revenue);
}
