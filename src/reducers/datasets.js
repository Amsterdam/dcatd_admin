import {
  FETCH_DATASETS_SUCCESS
} from '../actions/datasets/datasets';

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_DATASETS_SUCCESS:
      return [...action.datasets];
    default:
      return state;
  }
}
