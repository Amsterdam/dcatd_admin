import uiDataset from '../definitions/uiDataset';

export const FETCH_UI_DATASET_SUCCESS = 'FETCH_UI_DATASET_SUCCESS';
export const SET_UI_DATASET_ORDER = 'SET_UI_DATASET_ORDER';

export function fetchUiDatasetSuccess(uiSchema) {
  return {
    type: FETCH_UI_DATASET_SUCCESS,
    uiDataset: uiSchema
  };
}

export function fetchUiDataset() {
  return (dispatch) => {
    return dispatch(fetchUiDatasetSuccess(uiDataset));
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
