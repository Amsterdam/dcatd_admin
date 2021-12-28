import { SET_RESOURCE_TO_DATASET_SUCCESS } from '../../actions/resourceToDataset/resourceToDataset';

const initialState = {};

// eslint-disable-next-line default-param-last
export default function resourceToDataset(state = initialState, action) {
  switch (action.type) {
    case SET_RESOURCE_TO_DATASET_SUCCESS:
      return {
        ...action.resource
      };

    default:
      return state;
  }
}
