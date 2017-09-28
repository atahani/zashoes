import ActionType from '../constants/ActionTypes';

export default function categoryReducer(state = {}, action) {
  switch (action.type) {
    case ActionType.SET_CATEGORIES:
      return Object.assign({}, state, {
        [action.key]: { ...state[action.key], ...action.categories },
      });
    default:
      return state;
  }
}
