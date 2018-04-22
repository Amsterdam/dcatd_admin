import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchDataset } from './dataset';

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

describe('dataset actions', () => {
  it('should dispatch fetchDataset', () => {
    fetch.mockResponses([
      JSON.stringify({
        components: {
          schemas: {
            'dcat-doc': mockSschema
          }
        }
      })
    ], [
      JSON.stringify({
        '@id': 'ams-dcatd:ois-95620',
        'dct:description': 'Mooie dataset, zeg',
        'dct:identifier': 'ois-95620',
        'dct:title': 'Openbare orde en veiligheid (Amsterdam in Europa)',
        'dcat:distribution': ['foo', 'bar']
      }), {
        headers: {
          etag: '666'
        }
      }
    ]);

    const expectedActions = [{
      type: 'FETCH_SCHEMA_SUCCESS',
      schema: mockSschema
    }, {
      type: 'SET_UI_DATASET_ORDER',
      schema: mockSschema
    }, {
      type: 'SET_UI_RESOURCE_ORDER',
      schema: mockSschema
    }, {
      type: 'FETCH_DATASET_SUCCESS',
      dataset: {
        '@id': 'ams-dcatd:ois-95620',
        'dct:description': 'Mooie dataset, zeg',
        'dct:identifier': 'ois-95620',
        'dct:title': 'Openbare orde en veiligheid (Amsterdam in Europa)',
        'dcat:distribution': ['foo', 'bar'],
        etag: '666'
      }
    }];

    const store = mockStore();
    store.dispatch(fetchDataset('ois-95620')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
