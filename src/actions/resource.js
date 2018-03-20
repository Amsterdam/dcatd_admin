export const SET_RESOURCE_SUCCESS = 'SET_RESOURCE_SUCCESS';

export function setResourceSuccess(resource) {
  return {
    type: SET_RESOURCE_SUCCESS,
    resource
  };
}

export function setResource(resource) {
  return (dispatch) => {
    return dispatch(setResourceSuccess(resource));
  };
}
