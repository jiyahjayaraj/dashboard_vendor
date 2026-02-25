import { takeEvery, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import commonApi from '../api';
import appConfig from '../../config';
import * as actionType from './slice';

// Base API endpoint


/* ============================
   GET VENDOR FEEDBACKS
============================ */
function* getVendorFeedbacksSaga() {
  try {

    const accessToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];

    const params = {
      api: `${appConfig.ip}/api/vendor/feedbacks`,
      method: 'GET',
      authorization: 'Bearer',
      token: accessToken
    };

    const response = yield call(commonApi, params);

    console.log("API Response:", response);

    yield put(
      actionType.getVendorFeedbacksSuccess(response)
    );

  } catch (error) {

    console.error(error);

    yield put(
      actionType.getVendorFeedbacksFail(error.message)
    );

  }
}
/* ============================
   DELETE FEEDBACK
============================ */

function* deleteFeedbackSaga(action) {
  try {

    const accessToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];

    const params = {
      api: `${appConfig.ip}/api/vendor/feedback/${action.payload}`,
      method: 'DELETE',
      authorization: 'Bearer',
      token: accessToken
    };

    yield call(commonApi, params);

    yield put(
      actionType.deleteFeedbackSuccess(
        action.payload
      )
    );

    toast.success("Feedback deleted");

  } catch (error) {

    yield put(
      actionType.deleteFeedbackFail(
        error.message
      )
    );

    toast.error("Delete failed");

  }
}

export default function* ratingWatcher() {

  yield takeEvery(
    actionType.getVendorFeedbacks.type,
    getVendorFeedbacksSaga
  );

  yield takeEvery(
    actionType.deleteFeedback.type,
    deleteFeedbackSaga
  );

}