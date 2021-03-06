/*
 * combines all th existing reducers
 */

import { combineReducers } from 'redux';
import { weatherReducer } from '../views/weather/reducer';
import { createConversationReducer } from '../views/chat/reducer';

const appReducer = combineReducers({
  weather: weatherReducer,
  conversation: createConversationReducer,

  // but its referenced here
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
