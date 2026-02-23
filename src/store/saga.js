import { all, call } from 'redux-saga/effects';

import LoginActionWatcher from 'container/LoginContainer/saga';
import ratingActionWatcher from 'container/RatingContainer/saga';
import eventActionWatcher from 'container/eventContainer/saga';
import ticketActionWatcher from 'container/ticketcontainer/saga';
import  orderActionWatcher from 'container/orderContainer/saga';


function* rootSaga() {
  yield all([
    call(LoginActionWatcher),
    call(ratingActionWatcher),
    call(eventActionWatcher) ,  // 👈 ADD THIS
    call(ticketActionWatcher),
    call(orderActionWatcher)

  ]);
}

export default rootSaga;
