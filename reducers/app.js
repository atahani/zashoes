import ActionTypes from '../constants/ActionTypes';

// initial state of app state
const initialState = {
  articles_parameters: {},
  result_attr: {},
};

/**
 * app reducer used in redux
 * @param {object} state
 * @param {object} action
 */
export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_SHOES_PARAMETERS:
      return Object.assign({}, state, { articles_parameters: action.payload });
    case ActionTypes.CL_SHOES_PARAMETERS:
      return Object.assign({}, state, { articles_parameters: initialState.articles_parameters });
    case ActionTypes.SET_RESULT_ATTR:
      return Object.assign({}, state, { result_attr: action.attr });
    default:
      return state;
  }
}
