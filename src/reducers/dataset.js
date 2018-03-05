import {
  FETCH_DATASET_SUCCESS,
  REMOVE_DATASET_SUCCESS
} from '../actions/dataset';

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_DATASET_SUCCESS:
      return [
        ...state.filter(dataset => dataset.emailAddress !== action.dataset.emailAddress),
        Object.assign({}, action.dataset)
      ];
    case REMOVE_DATASET_SUCCESS:
      return state.filter(dataset => dataset.emailAddress !== action.dataset.emailAddress);
    default:
      return state;
  }
}

export function selectDataset(datasets, datasetId) {
  return datasets.find(dataset => dataset.id === datasetId);
}
