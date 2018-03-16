import { SET_RESOURCE_TO_DATASET_SUCCESS, EMPTY_RESOURCE_TO_DATASET_SUCCESS }
  from '../actions/resourceToDataset';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_RESOURCE_TO_DATASET_SUCCESS:
      return {
        ...action.resource
      };

    case EMPTY_RESOURCE_TO_DATASET_SUCCESS:
      return {};

    default:
      return state;
  }
}
