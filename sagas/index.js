import {fork, all} from 'redux-saga/effects';

const root = function* () {
  // saga flows
  yield all([]);
};
export default root;