import ActionType from '../constants/ActionTypes';

export const getCategoriesByParent = (parentCategory, page = 1) => ({ type: ActionType.GET_CATEGORIES_BY_PARENT, parentCategory, page });
export const setCategories = (key, categories) => ({ type: ActionType.SET_CATEGORIES, key, categories });
