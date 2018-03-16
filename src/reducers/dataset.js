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
        'dcat:distribution': [...action.dataset['dcat:distribution']]
          .map((distribution) => {
            distribution.id = Math.random().toString(36).substr(2, 10);

            // fix these in back end
            distribution['dcat:byteSize'] = 12345;
            distribution['foaf:isPrimaryTopicOf']['dct:issued'] = '2017-03-02';
            distribution['foaf:isPrimaryTopicOf']['dct:modified'] = '2016-11-21';
            return distribution;
          })
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
