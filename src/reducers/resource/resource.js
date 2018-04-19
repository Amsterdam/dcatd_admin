import { SET_RESOURCE_SUCCESS, EMPTY_RESOURCE_SUCCESS } from '../../actions/resource/resource';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_RESOURCE_SUCCESS:
      return {
        ...action.resource
      };

    case EMPTY_RESOURCE_SUCCESS:
      return {};

    default:
      return state;
  }
}
