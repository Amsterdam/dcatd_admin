import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  FETCH_DATASETS_SUCCESS,
  FETCH_DATASETS_FAILURE,
  fetchDatasetsSuccess,
  fetchDatasets,
  fetchDatasetsFailure
} from './datasets';

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

describe('datasets actions', () => {
  beforeEach(() => {
    global.scrollTo = jest.fn();
    fetch.resetMocks();
  });

  it('should create a FETCH_DATASETS_SUCCESS action', () => {
    // arrange
    const datasets = { id: 'datasets' };
    const expectedAction = {
      type: FETCH_DATASETS_SUCCESS,
      datasets
    };

    // act
    const action = fetchDatasetsSuccess(datasets);

    // assert
    expect(action).toEqual(expectedAction);
  });

  it('should create a FETCH_DATASETS_FAILURE action', () => {
    // arrange
    const error = { message: '' };
    const expectedAction = {
      type: FETCH_DATASETS_FAILURE,
      error
    };

    // act
    const action = fetchDatasetsFailure(error);

    // assert
    expect(action).toEqual(expectedAction);
  });

  it('should dispatch fetchDatasets', async () => {
    fetch.mockResponses([
      JSON.stringify({
        components: {
          schemas: {
            'dcat-dataset': mockSschema
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
      schema: mockSschema
    }, {
      type: 'SET_UI_DATASET_ORDER',
      schema: mockSschema
    }, {
      type: 'SET_UI_RESOURCE_ORDER',
      schema: mockSschema
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
    await store.dispatch(fetchDatasets());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should fail when any of the the api calls fails ', async () => {
    fetch.mockReject(new Error('fake error message'));

    const store = mockStore();
    await store.dispatch(fetchDatasets());
    expect(store.getState()).toEqual({});
    expect(store.getActions()).toEqual([{ type: FETCH_DATASETS_FAILURE, error: new Error('fake error message') }]);
  });

  it('should initialize the title and description to wmpty strings when not provided', async () => {
    fetch.once(JSON.stringify({
      components: {
        schemas: {
          'dcat-dataset': mockSschema
        }
      }
    }));
    fetch.once(JSON.stringify({
      'dcat:dataset': [{
        'dct:identifier': 'id'
      }]
    }));

    const store = mockStore();
    await store.dispatch(fetchDatasets());
    const actionsCount = store.getActions().length;
    expect(actionsCount).toEqual(4);

    const expectedResult = {
      type: FETCH_DATASETS_SUCCESS,
      datasets: [{
        id: 'id',
        description: '',
        title: ''
      }]
    };

    expect(store.getActions()[actionsCount - 1]).toEqual(expectedResult);
  });
});
