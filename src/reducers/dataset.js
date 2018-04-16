import {
  FETCH_DATASET_SUCCESS,
  EMPTY_DATASET_SUCCESS,
  REMOVE_DATASET_SUCCESS
} from '../actions/dataset/dataset';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_DATASET_SUCCESS:
      return {
        ...action.dataset,
        'dcat:distribution': [...action.dataset['dcat:distribution']]
      };

    case EMPTY_DATASET_SUCCESS:
      return {};

    case REMOVE_DATASET_SUCCESS:
      return state;

    default:
      return state;
  }
}
