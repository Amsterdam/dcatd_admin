import uiResource from '../definitions/uiResource';

export const FETCH_UI_RESOURCE_SUCCESS = 'FETCH_UI_RESOURCE_SUCCESS';
export const SET_UI_RESOURCE_ORDER = 'SET_UI_RESOURCE_ORDER';

export function fetchUiResourceSuccess(uiSchema) {
  return {
    type: FETCH_UI_RESOURCE_SUCCESS,
    uiResource: uiSchema
  };
}

export function setUiResourceOrderSuccess(schema) {
  return {
    ...schema,
    type: SET_UI_RESOURCE_ORDER
  };
}

export function fetchUiResource() {
  return (dispatch) => { // eslint-disable-line
    return dispatch(fetchUiResourceSuccess(uiResource));
  };
}

export function setUiResourceOrder(schema) {
  return (dispatch) => { // eslint-disable-line
    return dispatch(setUiResourceOrderSuccess(schema));
  };
}
