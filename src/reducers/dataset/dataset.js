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
    case REMOVE_DATASET_SUCCESS:
      return {};

    case EMPTY_DATASET_SUCCESS: {
      const date = new Date().toISOString().slice(0, 10);
      return {
        'foaf:isPrimaryTopicOf': {
          'dct:issued': date,
          'dct:modified': date
        }
      };
    }

    default:
      return state;
  }
}
