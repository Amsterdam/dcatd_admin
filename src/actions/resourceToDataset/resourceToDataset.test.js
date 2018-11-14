import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { setResourceToDataset } from './resourceToDataset';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('resourceToDataset actions', () => {
  it('should dispatch setResourceToDataset', () => {
    const expectedActions = [
      {
        type: 'SET_RESOURCE_TO_DATASET_SUCCESS',
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
    store.dispatch(setResourceToDataset({
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
});
