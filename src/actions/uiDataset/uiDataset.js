import uiDataset from '../../definitions/uiDataset';

export const FETCH_UI_DATASET_SUCCESS = 'FETCH_UI_DATASET_SUCCESS';
export const SET_UI_DATASET_ORDER = 'SET_UI_DATASET_ORDER';

export function fetchUiDatasetSuccess() {
  return {
    type: FETCH_UI_DATASET_SUCCESS,
    uiDataset
  };
}

export function fetchUiDataset() {
  return (dispatch) => {
    return dispatch(fetchUiDatasetSuccess());
  };
}

export function setUiDatasetOrderSuccess(schema) {
  return {
    ...schema,
    type: SET_UI_DATASET_ORDER
  };
}

export function setUiDatasetOrder(schema) {
  return (dispatch) => {
    return dispatch(setUiDatasetOrderSuccess(schema));
  };
}
