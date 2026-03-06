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

/* ===============================
   GET VENDOR ORDERS
================================ */
function* getVendorOrdersSaga() {
  try {

    console.log("Fetching vendor orders...");

    const res = yield call(commonApi, {
      api: `${appConfig.ip}/api/vendor-orders`,
      method: "GET",
      authorization: true,
      withCredentials: true
    });

    console.log("Vendor Orders API Response:", res);

    yield put(getVendorOrdersSuccess(res.orders));

  } catch (error) {

    console.error("Vendor Orders API ERROR:", error);

    yield put(
      getVendorOrdersFailure(
        error?.response?.data?.message || error.message
      )
    );
  }
}


/* ===============================
   UPDATE ORDER STATUS
================================ */
function* updateOrderStatusSaga(action) {
  try {

    const { orderId, status } = action.payload;

    console.log("Updating Order Status:", orderId, status);

    const res = yield call(commonApi, {
      api: `${appConfig.ip}/api/orders/${orderId}/status`,
      method: "PATCH",
      body: { status },
      authorization: true,
      withCredentials: true
    });

    console.log("Order Status Update Response:", res);

    yield put(updateOrderStatusSuccess(res?.data || res));

  } catch (error) {

    console.error("Order Status Update ERROR:", error);

    yield put(
      updateOrderStatusFailure(
        error?.response?.data?.message || error.message
      )
    );
  }
}


/* ===============================
   WATCHER
================================ */
export default function* orderActionWatcher() {

  yield takeLatest(
    getVendorOrdersRequest.type,
    getVendorOrdersSaga
  );

  yield takeLatest(
    updateOrderStatusRequest.type,
    updateOrderStatusSaga
  );

}