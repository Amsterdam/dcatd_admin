import {
  FETCH_DATASETS_SUCCESS
} from '../../actions/datasets/datasets';
import {
  CREATE_DATASET_SUCCESS,
  UPDATE_DATASET_SUCCESS,
  REMOVE_DATASET_SUCCESS
} from '../../actions/dataset/dataset';

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_DATASETS_SUCCESS:
      return [...action.datasets];

    case CREATE_DATASET_SUCCESS:
    case UPDATE_DATASET_SUCCESS:
    case REMOVE_DATASET_SUCCESS:
      return [];

    default:
      return state;
  }
}
