import mapKeys from 'lodash/mapKeys';
import ActionTypes from '../constants/ActionTypes';

// initial state of app state
const initialState = {
  articles_parameters: {},
  result_attr: {},
  shoes_result: {},
  result_attr_by_category: {},
};

/**
 * app reducer used in redux
 * @param {object} state
 * @param {object} action
 */
export default function appReducer(state = initialState, action) {
  switch (action.type) {
    // action > setShoesParameters
    case ActionTypes.SET_SHOES_PARAMETERS:
      return Object.assign({}, state, { articles_parameters: action.payload });
    // action > clearShoesParameters
    case ActionTypes.CL_SHOES_PARAMETERS:
      return Object.assign({}, state, { articles_parameters: initialState.articles_parameters });
    // action > setResultAttr
    case ActionTypes.SET_RESULT_ATTR:
      return Object.assign({}, state, { result_attr: action.attr });
    // action > setShoesItems
    case ActionTypes.SET_SHOES_RESULT: {
      // store as object base
      const newObj = mapKeys([action.payload], 'id');
      return Object.assign({}, state, {
        shoes_result: {
          ...newObj,
          ...state,
        },
      });
    }
    // action > clearShoesItems
    case ActionTypes.CL_SHOES_RESULT:
      return Object.assign({}, state, {
        shoes_result: {},
      });
    // action > setResultAttrByCategory
    case ActionTypes.SET_RESULT_ATTR_BY_CATEGORY: {
      // change the state with custom attr obj as actionType
      const obj = state.result_attr_by_category
        ? state.result_attr_by_category
        : {};
      // assing new obj attr if not exist
      if (obj[action.category]) {
        obj[action.category] = action.attr;
      } else {
      // define new property for object
        Object.defineProperty(obj, action.category, {
          value: action.attr,
          writable: true,
          enumerable: false,
        });
      }
      return Object.assign({}, state, {
        result_attr_by_category: obj,
      });
    }
    default:
      return state;
  }
}
