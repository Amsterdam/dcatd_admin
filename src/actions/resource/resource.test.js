import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { setResource, emptyResource } from './resource';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('resource actions', () => {
  it('should dispatch setResource', () => {
    const expectedActions = [
      {
        type: 'SET_RESOURCE_SUCCESS',
        resource: {
          '@id': '_:d1',
          'dct:title': 'Bewoners die zich veilig voelen in hun stad',
          'dcat:accessURL': 'http',
          'ams:resourceType': 'data',
          'ams:distributionType': 'file',
          'dcat:mediaType': 'application/vnd.ms-excel',
          'ams:classification': 'public'
        }
      }
    ];

    const store = mockStore();
    store.dispatch(setResource({
      '@id': '_:d1',
      'dct:title': 'Bewoners die zich veilig voelen in hun stad',
      'dcat:accessURL': 'http',
      'ams:resourceType': 'data',
      'ams:distributionType': 'file',
      'dcat:mediaType': 'application/vnd.ms-excel',
      'ams:classification': 'public'
    }));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should dispatch setUiDatasetOrder', () => {
    const expectedActions = [
      {
        type: 'EMPTY_RESOURCE_SUCCESS'
      }
    ];

    const store = mockStore();
    store.dispatch(emptyResource());

    expect(store.getActions()).toEqual(expectedActions);
  });
});
