import { FETCH_UI_RESOURCE_SUCCESS, SET_UI_RESOURCE_ORDER } from '../actions/uiResource';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_UI_RESOURCE_SUCCESS:
      return { ...action.uiResource };

    case SET_UI_RESOURCE_ORDER:
      return {
        ...state,
        'ui:order': action.schema.properties['dcat:distribution'].items['x-order']
      };

    default:
      return state;
  }
}
