import { takeLatest, put, call } from "redux-saga/effects";
import { toast } from "react-toastify";

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


/* =================================
   HELPER → extract backend message
================================= */
const getErrorMessage = (error) =>
  error?.response?.data?.message ||
  error?.message ||
  "Something went wrong";


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
    yield put(getEventsRequest({ vendorId: res.event.vendorId }));
  } catch (error) {
    const message = getErrorMessage(error);

    yield put(createEventFailure(message));

    toast.error(message); 
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
    const message = getErrorMessage(error);

    yield put(getEventsFailure(message));

    toast.error(message);
  }
}


/* =========================
   UPDATE EVENT
========================= */
function* updateEventSaga(action) {
  try {
    const { id, data } = action.payload;

    const res = yield call(commonApi, {
      api: `http://localhost:5000/api/events/${id}`,
      method: "PUT",
      body: data
    });

    yield put(updateEventSuccess(res));

    yield put(getEventsRequest({ vendorId: data.get("vendorId") }));

    toast.success("Event updated successfully");

  } catch (error) {
    const message = getErrorMessage(error);

    yield put(updateEventFailure(message));

    toast.error(message);
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