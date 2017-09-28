import { all, fork } from 'redux-saga/effects';
import ShoesFlows from './shoes';
import CategoryFlows from './category';

const root = function* () {
  // saga flows
  yield all([
    fork(ShoesFlows.filterShoesFlow),
    fork(CategoryFlows.getCategoriesByParentFlow),
  ]);
};
export default root;
