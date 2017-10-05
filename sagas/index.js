import { all, fork } from 'redux-saga/effects';
import ShoesFlows from './shoes';
import CategoryFlows from './category';

const root = function* () {
  // saga flows
  yield all([
    // shoes flows
    fork(ShoesFlows.filterShoesFlow),
    fork(ShoesFlows.getShoesByCategoryFlow),
    // category flows
    fork(CategoryFlows.getCategoriesByParentFlow),
  ]);
};
export default root;
