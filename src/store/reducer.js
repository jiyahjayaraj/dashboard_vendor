import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import loginReducer from 'container/LoginContainer/slice';
import ratingReducer from 'container/RatingContainer/slice';
import eventReducer from "../container/eventContainer/slice"; // ✅ THIS
import ticketReducer from "../container/ticketcontainer/slice";
import orderReducer from "../container/orderContainer/slice"




// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  login: loginReducer,
  customization: customizationReducer,
  rating: ratingReducer,
  event: eventReducer, // ✅ event state added
  ticket: ticketReducer,
  order: orderReducer
});

export default reducer;
