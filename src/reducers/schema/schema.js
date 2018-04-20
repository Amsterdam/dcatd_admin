import { FETCH_SCHEMA_SUCCESS } from '../../actions/schema/schema';

const initialState = {
  properties: {},
  required: [],
  type: 'object',
  'x-order': []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_SCHEMA_SUCCESS:
      return { ...action.schema };

    default:
      return state;
  }
}
