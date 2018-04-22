import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchDatasets } from './datasets';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const schema = {
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
    fetch.mockResponses([
      JSON.stringify({
        components: {
          schemas: {
            'dcat-doc': schema
          }
        }
      })
    ], [
      JSON.stringify({
        'dcat:dataset': [{
          'dct:identifier': 'id-1',
          'dct:title': 'dataset 1',
          'dct:description': 'omschrijving 1'
        }, {
          'dct:identifier': 'id-2',
          'dct:title': 'dataset 2',
          'dct:description': 'omschrijving 2'
        }]
      })
    ]);

    const expectedActions = [{
      type: 'FETCH_SCHEMA_SUCCESS',
      schema
    }, {
      type: 'SET_UI_DATASET_ORDER',
      schema
    }, {
      type: 'SET_UI_RESOURCE_ORDER',
      schema
    }, {
      type: 'FETCH_DATASETS_SUCCESS',
      datasets: [{
        id: 'id-1',
        title: 'dataset 1',
        description: 'omschrijving 1'
      }, {
        id: 'id-2',
        title: 'dataset 2',
        description: 'omschrijving 2'
      }]
    }];

    const store = mockStore();
    store.dispatch(fetchDatasets()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
