import { takeLatest, put, call } from "redux-saga/effects";
import {
  createEventRequest,
  createEventSuccess,
  createEventFailure,
  getEventsRequest,
  getEventsSuccess,
  getEventsFailure,
} from "./slice";
import commonApi from "../api"; // your API helper

/* CREATE EVENT */
function* createEventSaga(action) {
  try {
    // Create new event
    yield call(commonApi, {
      api: "http://localhost:5000/api/events",
      method: "POST",
      body: action.payload,
      
    });
    yield put(createEventSuccess(res));

    // REFRESH DATA: fetch events for the same vendor
    yield put(getEventsRequest({ vendorId: action.payload.vendorId }));
  } catch (error) {
    yield put(createEventFailure(error.message));
  }
}

/* GET EVENTS */
function* getEventsSaga(action) {
  try {
    const { vendorId } = action.payload; // must pass vendorId

    if (!vendorId) throw new Error("Vendor ID is required");

    const res = yield call(commonApi, {
      api: `http://localhost:5000/api/events/${vendorId}`, // vendorId in URL
      method: "GET",
      authorization: null,
      successAction: { type: getEventsSuccess.type },
      failAction: { type: getEventsFailure.type },
    });

    yield put(getEventsSuccess(res));
  } catch (error) {
    yield put(getEventsFailure(error.message));
  }
}

/* WATCHER */
export default function* eventActionWatcher() {
  yield takeLatest(createEventRequest.type, createEventSaga);
  yield takeLatest(getEventsRequest.type, getEventsSaga);
}
