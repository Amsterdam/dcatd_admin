export const SET_RESOURCE_TO_DATASET_SUCCESS = 'SET_RESOURCE_TO_DATASET_SUCCESS';

export function setResourceToDatasetSuccess(resource) {
  return {
    type: SET_RESOURCE_TO_DATASET_SUCCESS,
    resource
  };
}

export function setResourceToDataset(resource) {
  return (dispatch) => {
    return dispatch(setResourceToDatasetSuccess(resource));
  };
}
