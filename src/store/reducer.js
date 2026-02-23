import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import loginReducer from 'container/LoginContainer/slice';
import ratingReducer from 'container/RatingContainer/slice';
import eventReducer from "../container/eventContainer/slice"; // ✅ THIS
import ticketReducer from "../container/ticketcontainer/slice";
import orderReducer from "../container/orderContainer/slice"
import revenueReducer from "../container/revenueContainer/slice"
import subscriptionReducer from "../container/subscription/slice"
// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  login: loginReducer,
  customization: customizationReducer,
  rating: ratingReducer,
  event: eventReducer, // ✅ event state added
  ticket: ticketReducer,
  revenue:revenueReducer,
  subscription:subscriptionReducer,
  order: orderReducer
});

export default reducer;
