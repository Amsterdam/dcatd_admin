import uiResource from '../../definitions/uiResource';

export const FETCH_UI_RESOURCE_SUCCESS = 'FETCH_UI_RESOURCE_SUCCESS';
export const SET_UI_RESOURCE_ORDER = 'SET_UI_RESOURCE_ORDER';

export function fetchUiResourceSuccess() {
  return {
    type: FETCH_UI_RESOURCE_SUCCESS,
    uiResource
  };
}

export function fetchUiResource() {
  return (dispatch) => {
    return dispatch(fetchUiResourceSuccess());
  };
}

export function setUiResourceOrderSuccess(schema) {
  return {
    ...schema,
    type: SET_UI_RESOURCE_ORDER
  };
}

export function setUiResourceOrder(schema) {
  return (dispatch) => {
    return dispatch(setUiResourceOrderSuccess(schema));
  };
}
