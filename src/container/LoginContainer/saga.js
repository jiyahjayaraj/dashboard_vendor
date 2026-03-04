
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
      body: loginReq
    };

    const res = yield call(commonApi, params);
    console.log('LOGIN RES:', res);

    if (res) {
    
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
      credentials: 'include'
    };

    const res = yield call(commonApi, params);

    yield put(actionType.userMeSuccess(res));
    if (
 !res.vendorName ||
 !res.vendorPhone ||
 !res.vendorAddress
) {
 yield put(actionType.setProfileIncomplete(true));
} else {
 yield put(actionType.setProfileIncomplete(false));
}
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

function* updateProfile(action) {
  try {
    const params = {
      api: `${appConfig.ip}/api/updateProfile`,
      method: "PUT",
      body: action.payload,  
      credentials: 'include'
    };

    yield call(commonApi, params);

    yield call(toast.success, "Profile updated successfully", {
      autoClose: 3000
    });

    yield put(actionType.userMe());
    yield put(actionType.updateProfileSuccess());

  } catch (error) {
    yield put(actionType.updateProfileFail(error));
    yield call(toast.error, "Profile update failed");
  }
}

export default function* LoginActionWatcher() {
  yield takeEvery(actionType.userLogin, login);
  yield takeEvery(actionType.userMe, userMe);
  yield takeEvery(actionType.updateProfile, updateProfile);
}
