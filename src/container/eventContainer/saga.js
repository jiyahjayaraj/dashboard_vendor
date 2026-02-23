import { takeLatest, put, call } from "redux-saga/effects";
import {
  createEventRequest,
  createEventSuccess,
  createEventFailure,
  getEventsRequest,
  getEventsSuccess,
  getEventsFailure,
  updateEventRequest,
  updateEventSuccess,
  updateEventFailure
} from "./slice";

import commonApi from "../api";

/* =========================
   CREATE EVENT
========================= */
function* createEventSaga(action) {
  try {
    const res = yield call(commonApi, {
      api: "http://localhost:5000/api/events/vendor",
      method: "POST",
      body: action.payload
    });

    yield put(createEventSuccess(res));

    // Refresh list
    yield put(getEventsRequest({ vendorId: action.payload.get("vendorId") }));

  } catch (error) {
    yield put(createEventFailure(error.message));
  }
}


/* =========================
   GET EVENTS
========================= */
function* getEventsSaga(action) {
  try {
    const { vendorId } = action.payload;

    if (!vendorId) throw new Error("Vendor ID is required");

    const res = yield call(commonApi, {
      api: `http://localhost:5000/api/events/vendor/${vendorId}`,
      method: "GET"
    });

    yield put(getEventsSuccess(res));

  } catch (error) {
    yield put(getEventsFailure(error.message));
  }
}


/* =========================
   UPDATE EVENT
========================= */
function* updateEventSaga(action) {
  try {
    const { id, data } = action.payload;

    const res = yield call(commonApi, {
      api: `http://localhost:5000/api/events/vendor/${id}`,
      method: "PUT",
      body: data
    });

    yield put(updateEventSuccess(res));

    // Refresh list after update
    yield put(getEventsRequest({ vendorId: data.get("vendorId") }));

  } catch (error) {
    yield put(updateEventFailure(error.message));
  }
}


/* =========================
   WATCHER
========================= */
export default function* eventActionWatcher() {
  yield takeLatest(createEventRequest.type, createEventSaga);
  yield takeLatest(getEventsRequest.type, getEventsSaga);
  yield takeLatest(updateEventRequest.type, updateEventSaga);
}
