import { takeEvery, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import commonApi from '../api';
import appConfig from '../../config';
import * as actionType from './slice';

// Base API endpoint for ratings
const RATING_API_BASE = `${appConfig.ip}`;




function* getRatingsSaga(action) {
  const tokenData = JSON.parse(localStorage.getItem('Token'));
  const accessToken = tokenData?.accessToken;
  try {
    let params = {
      api: `${RATING_API_BASE}/${action.payload}`,
      method: 'GET',
      successAction: actionType.getRatingCountSuccess(),
      failAction: actionType.getRatingCountFail(),
      authorization: 'Bearer',
      token:  accessToken
    };
   let res = yield call(commonApi, params);
  } catch (error) {
    console.error('Fetch user Feedback count failed:', error);

  }
}


export default function* ratingWatcher() {
    yield takeEvery(actionType.getRatingCount.type, getRatingsSaga);

}