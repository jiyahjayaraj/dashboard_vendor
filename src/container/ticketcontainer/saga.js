import { takeLatest, put, call } from "redux-saga/effects";
import appConfig from '../../config';
import {
  createTicketRequest,
  createTicketSuccess,
  createTicketFailure,
  getTicketsRequest,
  getTicketsSuccess,
  getTicketsFailure,
  updateTicketRequest,
  updateTicketSuccess,
  updateTicketFailure,
  updateTicketStatusRequest,
  updateTicketStatusSuccess,
  updateTicketStatusFailure,
} from "./slice";
import commonApi from "../api";

/* CREATE TICKET TYPE */
function* createTicketSaga(action) {
  try {
    yield call(commonApi, {
      api: `${appConfig.ip}/api/tickets/create`,
      method: "POST",
      body: action.payload, 
      authorization: null,
    });

    // REFRESH DATA: fetch tickets for the same event
    yield put(getTicketsRequest({ eventId: action.payload.eventId }));
  } catch (error) {
    yield put(createTicketFailure(error.message));
  }
}

/* GET TICKETS BY EVENT */
function* getTicketsSaga(action) {
  try {
    const { eventId } = action.payload;
    if (!eventId) throw new Error("Event ID is required");

    const res = yield call(commonApi, {
      api: `${appConfig.ip}/api/tickets/event/${eventId}`,
      method: "GET",
      authorization: null,
    });

    yield put(getTicketsSuccess(res));
  } catch (error) {
    yield put(getTicketsFailure(error.message));
  }
}


/* UPDATE TICKET TYPE */
function* updateTicketSaga(action) {
  try {
    const { ticketTypeId, data, eventId } = action.payload;

    yield call(commonApi, {
      api: `${appConfig.ip}/api/tickets/${ticketTypeId}`,
      method: "PUT",
      body: data, // ✅ DO NOT stringify
      authorization: null,
    });

    if (eventId) {
      yield put(getTicketsRequest({ eventId }));
    }

  } catch (error) {
    yield put(updateTicketFailure(error.message));
  }
}


/* UPDATE TICKET STATUS */
function* updateTicketStatusSaga(action) {
  try {
    const { ticketTypeId, status, eventId } = action.payload;

    yield call(commonApi, {
      api: `${appConfig.ip}/api/tickets/${ticketTypeId}/status`,
      method: "PATCH",
      body: JSON.stringify({ status }),
      authorization: null,
      successAction: { type: updateTicketStatusSuccess.type },
      failAction: { type: updateTicketStatusFailure.type },
    });

    if (eventId) {
      yield put(getTicketsRequest({ eventId }));
    }
  } catch (error) {
    yield put(updateTicketStatusFailure(error.message));
  }
}


/* WATCHER */
export default function* ticketActionWatcher() {
  yield takeLatest(createTicketRequest.type, createTicketSaga);
  yield takeLatest(getTicketsRequest.type, getTicketsSaga);
  yield takeLatest(updateTicketRequest.type, updateTicketSaga);
  yield takeLatest(updateTicketStatusRequest.type, updateTicketStatusSaga);
}
