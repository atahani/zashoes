import ActionTypes from '../constants/ActionTypes';

export const getShoesByCategory = (category, page = 1, pageSize = 20) => ({ type: ActionTypes.GET_SHOES_BY_CATEGORY, category, page, pageSize });
export const setShoesByCategory = (category, payload) => ({ type: ActionTypes.SET_SHOES_BY_CATEGORY, category, payload });
export const clearShoesByCategory = (category) => ({ type: ActionTypes.CL_SHOES_BY_CATEGORY, category });
export const clearAllShoesByCategory = () => ({ type: ActionTypes.CL_ALL_SHOES_BY_CATEGORY });
export const filterShoes = (parameters = {}, page = 1, pageSize = 20) => ({ type: ActionTypes.FILTER_SHOES, parameters, page, pageSize });
