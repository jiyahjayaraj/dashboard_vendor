import { takeLatest, put, call } from "redux-saga/effects";
import appConfig from "../../config";
import {
  getVendorOrdersRequest,
  getVendorOrdersSuccess,
  getVendorOrdersFailure,
  updateOrderStatusRequest,
  updateOrderStatusSuccess,
  updateOrderStatusFailure,
} from "./slice";
import commonApi from "../api";

/* GET VENDOR ORDERS */
function* getVendorOrdersSaga() {
  try {
    const res = yield call(commonApi, {
      api: `${appConfig.ip}/api/vendor-orders`,
      method: "GET",
      authorization: true,
    });

    yield put(getVendorOrdersSuccess(res?.data || res));

  } catch (error) {
    yield put(
      getVendorOrdersFailure(
        error?.response?.data?.message || error.message
      )
    );
  }
}

/* UPDATE ORDER STATUS */
function* updateOrderStatusSaga(action) {
  try {
    const { orderId, status } = action.payload;

    const res = yield call(commonApi, {
      api: `${appConfig.ip}/api/orders/${orderId}/status`,
      method: "PATCH",
      body: { status },
      authorization: true,
    });

    yield put(updateOrderStatusSuccess(res?.data || res));

  } catch (error) {
    yield put(
      updateOrderStatusFailure(
        error?.response?.data?.message || error.message
      )
    );
  }
}

/* WATCHER */
export default function* orderActionWatcher() {
  yield takeLatest(getVendorOrdersRequest.type, getVendorOrdersSaga);
  yield takeLatest(updateOrderStatusRequest.type, updateOrderStatusSaga);
}