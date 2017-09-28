import mapKeys from 'lodash/mapKeys';
import ActionType from '../constants/ActionTypes';

export default function categoryReducer(state = {}, action) {
  switch (action.type) {
    case ActionType.SET_CATEGORIES: {
      const newItems = mapKeys(action.categories, 'key');
      return Object.assign({}, state, {
        [action.key]: { ...state[action.key], ...newItems },
      });
    }
    default:
      return state;
  }
}
