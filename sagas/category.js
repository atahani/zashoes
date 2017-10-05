import { take, call, put } from 'redux-saga/effects';
import { API_ROOT } from 'react-native-dotenv';
import ActionType from '../constants/ActionTypes';
import { getReq } from '../api/rest-helper';
import { categoryFields } from '../api/helper';
import { setCategories, getCategoriesByParent } from '../actions/category';
import { getState } from '../store';

const getCategoriesByParentFlow = function* () {
  while (true) {
    const { parentCategory, page } = yield take(ActionType.GET_CATEGORIES_BY_PARENT);
    // before get categories should check have it inside state or not
    if (!getState().category[parentCategory] && page === 1) {
      const { response, error } = yield call(getReq, `${API_ROOT}/categories?fields=${categoryFields}&parentKey=${parentCategory}&page=${page}`);
      if (response) {
        yield put(setCategories(parentCategory, response.content));
        // check if have many page get it one by one
        if (response.totalPages > page) {
          yield put(getCategoriesByParent(parentCategory, page + 1));
        }
      } else {
        /* eslint no-console: "off" */
        console.warn('the error is ', error);
      }
    } 
  }
};

export default {
  getCategoriesByParentFlow,
};
