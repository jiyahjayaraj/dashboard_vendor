import { all, call } from 'redux-saga/effects';

import LoginActionWatcher from 'container/LoginContainer/saga';
import ratingActionWatcher from 'container/RatingContainer/saga';
import eventActionWatcher from 'container/eventContainer/saga';
import ticketActionWatcher from 'container/ticketcontainer/saga';
import RevenueWatcher from 'container/revenueContainer/saga';
import SubscriptionWatcher from 'container/subscription/saga';

function* rootSaga() {
  yield all([
    call(LoginActionWatcher),
    call(ratingActionWatcher),
    call(eventActionWatcher) ,  // 👈 ADD THIS
    call(ticketActionWatcher),
    call(RevenueWatcher),
    call(SubscriptionWatcher),
  ]);
}

export default rootSaga;
