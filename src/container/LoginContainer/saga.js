
import { takeEvery, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import commonApi from '../api';
import appConfig from '../../config';
import * as actionType from './slice';

function* login(action) {
  const loginReq = {
    vendorEmail: action.payload.email,
    password: action.payload.password
  };


  try {
    const params = {
      api: `${appConfig.ip}/api/vendors/login`,
      method: 'POST',
      successAction: actionType.loginSuccess(),
      failAction: actionType.loginFail(),
      authorization: null,
      body: loginReq
    };

    const res = yield call(commonApi, params);
    console.log('LOGIN RES:', res);

    if (res) {
      localStorage.setItem("token", res.vendor_token);
      

      yield call(toast.success, 'Login successful', { autoClose: 3000 });

      yield call(userMe);

      yield call(action.payload.navigate, '/dashboard');
    } else {
      yield call(toast.error, 'Login failed. Please try again.', { autoClose: 3000 });
    }
  }
  catch (error) {
    console.error('Login failed:', error);
    yield call(toast.error, 'Login failed. Please try again.', { autoClose: 3000 });
  }
}
function* userMe() {
  try {
    const params = {
      api: `${appConfig.ip}/api/vendor_dashboard`,
      method: 'GET',
      authorization: 'Bearer',
      token: localStorage.getItem("token")
    };

    const res = yield call(commonApi, params);

    yield put(actionType.userMeSuccess(res));
  } catch (error) {
    console.error('Fetch User failed:', error);
    yield put(
      actionType.userMeFail({
        message: error.message || 'Failed to fetch user.',
        status: error.response?.status || 5000
      })
    );
    yield call(toast.error, 'Failed to load user details.', { autoClose: 3000 });
  }
}

export default function* LoginActionWatcher() {
  yield takeEvery(actionType.userLogin, login);
  yield takeEvery(actionType.userMe, userMe);
}
