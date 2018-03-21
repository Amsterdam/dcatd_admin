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
        ...action.dataset,
        'dcat:distribution': (action.dataset['dcat:distribution'] ? [...action.dataset['dcat:distribution']]
          .map((distribution) => {
            distribution['@id'] = `_:${Math.random().toString(36).substr(2, 10)}`;
            return distribution;
          }) : [])
      };

    case EMPTY_DATASET_SUCCESS:
      return {};

    case REMOVE_DATASET_SUCCESS:
      return state;

    default:
      return state;
  }
}
