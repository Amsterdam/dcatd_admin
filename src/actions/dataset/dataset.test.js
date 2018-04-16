import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import { apiUrl, fetchDataset } from './dataset';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('datasets actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('FETCH_DATASET_SUCCESS', () => {
    fetchMock
      .getOnce(apiUrl, {
        body: {
          '@id': 'ams-dcatd:ois-95620',
          'dct:description': 'Tekst',
          'dct:identifier': 'ois-95620',
          'dct:title': 'De mooie titel'
        },
        headers: {
          'content-type': 'application/json'
        }
      });

    const expectedActions = [{
      type: 'FETCH_DATASET_SUCCESS',
      dataset: {
        '@id': 'ams-dcatd:ois-95620',
        'dct:description': 'Tekst',
        'dct:identifier': 'ois-95620',
        'dct:title': 'De mooie titel'
      }
    }];

    const store = mockStore();

    return store.dispatch(fetchDataset('ams-dcatd:ois-95620')).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
