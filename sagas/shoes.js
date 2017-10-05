import { take, call, put, all } from 'redux-saga/effects';
import { API_ROOT } from 'react-native-dotenv';
import ActionTypes from '../constants/ActionTypes';
import { getReq } from '../api/rest-helper';
import { buildQueryStrByParameters, shoesFields } from '../api/helper';
import { setShoesByCategory } from '../actions/shoes';
import { setResultAttr, setShoesParameters, setResultAttrByCategory, setShoesItems } from '../actions/app';

const filterShoesFlow = function* () {
  // catch filter action
  while (true) {
    const { parameters, page, pageSize } = yield take(ActionTypes.FILTER_SHOES);
    const url = `${API_ROOT}/articles?fields=${shoesFields}&${buildQueryStrByParameters(parameters)}&page=${page}&pageSize=${pageSize}`;
    const { response, error } = yield call(getReq, url);
    if (response) {
      yield all([
        put(setShoesItems(response.content)),
        put(setResultAttr({ totalElements: response.totalElements, totalPages: response.totalPages, page: response.page, size: response.size })),
        put(setShoesParameters(parameters)),
      ]);
    } else {
      // handle common error
      /* eslint no-console: "off" */
      console.warn('the error is ', error);
    }
  }
};

const getShoesByCategoryFlow = function* () {
  // catch filter shoes by category
  while (true) {
    const { category, page, pageSize } = yield take(ActionTypes.GET_SHOES_BY_CATEGORY);
    const parameters = {
      category: [category],
    };
    const url = `${API_ROOT}/articles?fields=${shoesFields}&${buildQueryStrByParameters(parameters)}&page=${page}&pageSize=${pageSize}`;
    const { response, error } = yield call(getReq, url);
    if (response) {
      const attr = {
        totalElements: response.totalElements,
        totalPages: response.totalPages,
        page: response.page,
        size: response.size,
      };
      yield all([
        put(setShoesByCategory(category, response.content)),
        put(setResultAttrByCategory(category, attr)),
        put(setShoesParameters(parameters)),
      ]);
    } else {
      // handle common error
      /* eslint no-console: "off" */
      console.warn('the error is ', error);
    }
  }
};

export default {
  filterShoesFlow,
  getShoesByCategoryFlow,
};
