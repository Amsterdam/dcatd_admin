import {
  FETCH_DATASET_SUCCESS,
  CREATE_DATASET_SUCCESS,
  UPDATE_DATASET_SUCCESS,
  CANCEL_DATASET_SUCCESS,
  EMPTY_DATASET_SUCCESS,
  REMOVE_DATASET_SUCCESS
} from '../../actions/dataset/dataset';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_DATASET_SUCCESS:
      return {
        ...action.dataset
      };

    case CREATE_DATASET_SUCCESS:
    case UPDATE_DATASET_SUCCESS:
    case CANCEL_DATASET_SUCCESS:
    case EMPTY_DATASET_SUCCESS:
    case REMOVE_DATASET_SUCCESS:
      return {};

    default:
      return state;
  }
}
