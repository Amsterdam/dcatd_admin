import { SET_RESOURCE_SUCCESS, EMPTY_RESOURCE_SUCCESS } from '../../actions/resource/resource';

const initialState = {};

// eslint-disable-next-line default-param-last
export default function resource(state = initialState, action) {
  switch (action.type) {
    case SET_RESOURCE_SUCCESS:
      return {
        'dct:modified': new Date().toISOString().split('T')[0],
        ...action.resource
      };

    case EMPTY_RESOURCE_SUCCESS:
      return {};

    default:
      return state;
  }
}
