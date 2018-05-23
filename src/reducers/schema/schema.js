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
      if (action.schema.properties) {
        // in ff in adw the all dates are incorrectly validated: this is a temporal fix
        delete action.schema.properties['dcat:distribution'].items.properties['dct:modified'].pattern;
        delete action.schema.properties['foaf:isPrimaryTopicOf'].properties['dct:issued'].pattern;
        delete action.schema.properties['dct:temporal'].properties['time:hasBeginning'].pattern;
        delete action.schema.properties['dct:temporal'].properties['time:hasEnd'].pattern;
      }
      return { ...action.schema };

    default:
      return state;
  }
}
