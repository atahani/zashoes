import { combineReducers } from 'redux';
import app from './app';
import shoesByCategory from './shoes';
import category from './category';

// combine multiple reducers
const appReducer = combineReducers({
  // you can add many reducer
  app,
  shoes_by_category: shoesByCategory,
  category,
});

export default appReducer;
