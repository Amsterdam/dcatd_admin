import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import { fetchDatasets } from './datasets';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('datasets actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('FETCH_DATASETS_SUCCESS', () => {
    fetchMock
      .getOnce('https://acc.api.data.amsterdam.nl/dcatd/datasets', {
        body: {
          'dcat:dataset': [
            {
              '@id': 'ams-dcatd:ois-95620',
              'dct:description': 'Tekst',
              'dct:identifier': 'ois-95620',
              'dct:title': 'De mooie titel'
            }, {
              '@id': 'ams-dcatd:fooo',
              'dct:identifier': 'fooo'
            }
          ]
        },
        headers: {
          'content-type': 'application/json'
        }
      });

    const expectedActions = [{
      type: 'FETCH_DATASETS_SUCCESS',
      datasets: [
        {
          description: 'Tekst',
          id: 'ois-95620',
          title: 'De mooie titel'
        }, {
          description: '',
          id: 'fooo',
          title: ''
        }
      ]
    }];

    const store = mockStore();

    return store.dispatch(fetchDatasets()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
