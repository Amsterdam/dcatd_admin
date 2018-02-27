import {
  FETCH_DATASET_SUCCESS,
  FETCH_DATASETS_SUCCESS,
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
    case FETCH_DATASETS_SUCCESS:
      return [...action.datasets];
    case REMOVE_DATASET_SUCCESS:
      return state.filter(dataset => dataset.emailAddress !== action.dataset.emailAddress);
    default:
      return state;
  }
}

// TODO: Determine better location for store querying
export function getActiveDatasets(datasets, filter) {
  switch (filter) {
    case 'SHOW_ALL':
      return datasets;
    case 'SHOW_ACTIVE':
      return datasets.filter(dataset => dataset.active === 'true');
    case 'SHOW_INACTIVE':
      return datasets.filter(dataset => dataset.active === 'false');
    default:
      throw new Error(`Unknown filter: ${filter}`);
  }
}

export function selectDataset(datasets, datasetId) {
  return datasets.find(dataset => dataset.emailAddress === datasetId);
}
