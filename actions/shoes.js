import ActionType from '../constants/ActionTypes';

export const filterShoes = (parameters = {}, page = 1, pageSize = 20) => ({ type: ActionType.FILTER_SHOES, parameters, page, pageSize });
export const setShoesItems = (payload) => ({ type: ActionType.SET_SHOES_LIST, payload });
export const clearShoesItems = () => ({ type: ActionType.CL_SHOES_LIST });
