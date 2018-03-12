import { FETCH_SCHEMA_SUCCESS } from '../actions/schema';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_SCHEMA_SUCCESS:
      return { ...action.schema };
    default:
      return state;
  }
}
