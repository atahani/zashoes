import { combineReducers } from 'redux';
import app from './app';
import shoes from './shoes';
import category from './category';

// combine multiple reducers
const appReducer = combineReducers({
  // you can add many reducer
  app,
  shoes,
  category,
});

export default appReducer;
