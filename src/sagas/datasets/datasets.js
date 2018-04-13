import { call, put, takeLatest } from 'redux-saga/effects';

import actionFetchDatasets from '../../services/datasets/datasets';

function* fetchDatasets() {
  try {
    const datasets = yield call(actionFetchDatasets);
    yield put({
      type: 'FETCH_DATASETS_SUCCESS',
      datasets
    });
  } catch (error) {
    yield put({ type: 'FETCH_DATASETS_FAILURE', error });
  }
}

export default function* watchFetchDatasets() {
  yield takeLatest('FETCH_DATASETS_REQUEST', fetchDatasets);
}
