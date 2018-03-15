export const GET_RESOURCE_SUCCESS = 'GET_RESOURCE_SUCCESS';

export function getResourceSuccess(resource) {
  return {
    type: GET_RESOURCE_SUCCESS,
    resource
  };
}

export function getResource(resource) {
  return (dispatch) => {
    return dispatch(getResourceSuccess(resource));
  };
}
