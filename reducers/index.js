import { combineReducers } from 'redux';
import app from './app';

// combine multiple reducers
const appReducer = combineReducers({
  // you can add many reducer
  app,
});

export default appReducer;