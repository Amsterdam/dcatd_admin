import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchSchema } from './schema';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockSschema = {
  properties: {
    'dct:title': {
      title: 'Titel',
      type: 'string'
    },
    'dct:description': {
      title: 'Beschrijving',
      type: 'string'
    }
  },
  required: ['dct:title'],
  type: 'object',
  'x-order': ['dct:title', 'dct:description']
};

describe('schema actions', () => {
  it('should dispatch fetchSchema', () => {
    fetch.mockResponseOnce(JSON.stringify({
      components: {
        schemas: {
          'dcat-doc': mockSschema
        }
      }
    }));

    const expectedActions = [{
      type: 'FETCH_SCHEMA_SUCCESS',
      schema: mockSschema
    }, {
      type: 'SET_UI_DATASET_ORDER',
      schema: mockSschema
    }, {
      type: 'SET_UI_RESOURCE_ORDER',
      schema: mockSschema
    }];

    const store = mockStore();
    store.dispatch(fetchSchema()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
