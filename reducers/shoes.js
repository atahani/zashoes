import mapKeys from 'lodash/mapKeys';
import ActionTypes from '../constants/ActionTypes';

export default function shoesReducer(state = {}, action) {
  switch (action.type) {
    // action > setShoesItem
    case ActionTypes.SET_SHOES:
    {
      const newObj = mapKeys([action.payload], 'id');
      return Object.assign({}, state, {
        ...newObj,
        ...state,
      });
    }
    // action > setShoesItems
    case ActionTypes.SET_SHOES_LIST:
    {
      // the payload === array of entity items
      const newItems = mapKeys(action.payload, 'id');
      return Object.assign({}, state, {
        ...state,
        ...newItems,
      });
    }
    // action > clearShoesItems
    case ActionTypes.CL_SHOES_LIST:
      return {};
    default:
      return state;
  }
}
