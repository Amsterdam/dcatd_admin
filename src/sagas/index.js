import { all, fork } from 'redux-saga/effects';

import watchFetchDatasets from './datasets/datasets';

export default function* rootSaga() {
  yield all([
    fork(watchFetchDatasets)
  ]);
}
