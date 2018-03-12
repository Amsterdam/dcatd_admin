import {
  FETCH_DATASET_SUCCESS,
  EMPTY_DATASET_SUCCESS,
  REMOVE_DATASET_SUCCESS
} from '../actions/dataset';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_DATASET_SUCCESS:
      return {
        ...action.dataset
      };
    case EMPTY_DATASET_SUCCESS:
      return {};
    case REMOVE_DATASET_SUCCESS:
      return state;
      // return state.datasets.filter(dataset => dataset.id !== action.dataset['dct:identifier']);
    default:
      return state;
  }
}
