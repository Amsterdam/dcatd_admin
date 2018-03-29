import { SET_RESOURCE_SUCCESS,
  EMPTY_RESOURCE_SUCCESS,
  SET_RESOURCE_SPECS_SUCCESS } from '../actions/resource';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_RESOURCE_SUCCESS:
      return {
        ...action.resource
      };

    case EMPTY_RESOURCE_SUCCESS:
      return {};

    case SET_RESOURCE_SPECS_SUCCESS:
      return {
        ...state,
        ...action.specs
      };

    default:
      return state;
  }
}
