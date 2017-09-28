import ActionTypes from '../constants/ActionTypes';

export const setShoesParameters = (payload = {}) => ({ type: ActionTypes.SET_SHOES_PARAMETERS, payload });
export const clearShoesParameters = () => ({ type: ActionTypes.CL_SHOES_PARAMETERS });
export const setResultAttr = (attr = {}) => ({ type: ActionTypes.SET_RESULT_ATTR, attr });
