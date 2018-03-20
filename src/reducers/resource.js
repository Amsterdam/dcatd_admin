import { SET_RESOURCE_SUCCESS } from '../actions/resource';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_RESOURCE_SUCCESS:
      return {
        ...action.resource
      };

    default:
      return state;
  }
}
