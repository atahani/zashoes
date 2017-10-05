import mapKeys from 'lodash/mapKeys';
import ActionTypes from '../constants/ActionTypes';

export default function shoesReducer(state = {}, action) {
  switch (action.type) {
    // action > setShoesByCategory
    case ActionTypes.SET_SHOES_BY_CATEGORY: {
      const newItems = mapKeys(action.payload, 'id');
      return Object.assign({}, state, {
        [action.category]: { ...state[action.category], ...newItems },
      });
    }
    // action > clearShoesByCategory
    case ActionTypes.CL_SHOES_BY_CATEGORY: {
      return Object.assign({}, state, {
        [action.category]: {},
      });
    }
    // action > clearAllShoesByCategory
    case ActionTypes.CL_ALL_SHOES_BY_CATEGORY:
      return {};
    default:
      return state;
  }
}
