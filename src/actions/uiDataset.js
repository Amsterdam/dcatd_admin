import uiDataset from '../definitions/uiDataset';

export const FETCH_UI_DATASET_SUCCESS = 'FETCH_UI_DATASET_SUCCESS';
export const SET_UI_DATASET_ORDER = 'SET_UI_DATASET_ORDER';

export function fetchUiDatasetSuccess(uiSchema) {
  return {
    type: FETCH_UI_DATASET_SUCCESS,
    uiDataset: uiSchema
  };
}

export function setUiDatasetOrderSuccess(schema) {
  return {
    ...schema,
    type: SET_UI_DATASET_ORDER
  };
}

export function fetchUiDataset() {
  return (dispatch) => { // eslint-disable-line
    return dispatch(fetchUiDatasetSuccess(uiDataset));
  };
}

export function setUiDatasetOrder(schema) {
  return (dispatch) => { // eslint-disable-line
    return dispatch(setUiDatasetOrderSuccess(schema));
  };
}
