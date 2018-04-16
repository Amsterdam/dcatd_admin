import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import { apiUrl, fetchDataset } from './dataset';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('dataset actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('FETCH_DATASET_SUCCESS with etag', () => {
    fetchMock
      .getOnce(`${apiUrl}/ams-dcatd:ois-95620`, {
        body: {
          '@id': 'ams-dcatd:ois-95620',
          'dct:description': 'Tekst',
          'dct:identifier': 'ois-95620',
          'dct:title': 'De mooie titel'
        },
        headers: {
          'content-type': 'application/json',
          etag: '666'
        }
      });

    const expectedActions = [{
      type: 'FETCH_DATASET_SUCCESS',
      dataset: {
        '@id': 'ams-dcatd:ois-95620',
        'dct:description': 'Tekst',
        'dct:identifier': 'ois-95620',
        'dct:title': 'De mooie titel',
        etag: '666'
      }
    }];

    const store = mockStore();

    return store.dispatch(fetchDataset('ams-dcatd:ois-95620')).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
