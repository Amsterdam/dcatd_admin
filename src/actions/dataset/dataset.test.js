import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchDataset, createDataset, emptyDataset, updateDataset, removeDataset } from './dataset';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockDataset = {
  '@id': 'ams-dcatd:ois-95620',
  'dct:description': 'Mooie dataset, zeg',
  'dct:identifier': 'ois-95620',
  'dct:title': 'Openbare orde en veiligheid (Amsterdam in Europa)',
  'dcat:distribution': ['foo', 'bar']
};
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
const mockModel = {
  actionLabel: 'OK',
  cancelLabel: null,
  content: 'SERVER_ERROR',
  open: true,
  onProceed: expect.any(Function)
};

describe('dataset actions', () => {
  let origSessionStorage;
  let savedStateToken;
  let savedReturnPath;
  let savedAccessToken;

  beforeEach(() => {
    // stateToken = '123StateToken';
    savedStateToken = '';
    savedReturnPath = '';
    savedAccessToken = '';

    origSessionStorage = global.sessionStorage;
    global.sessionStorage = {};
    global.sessionStorage.getItem = jest.fn();
    global.sessionStorage.getItem.mockImplementation((key) => {
      // console.log('key', key, savedAccessToken);
      switch (key) {
        case 'accessToken':
          return savedAccessToken;
        case 'stateToken':
          return savedStateToken;
        case 'returnPath':
          return savedReturnPath;
        default:
          return null;
      }
    });
    global.sessionStorage.setItem = jest.fn();
    global.sessionStorage.removeItem = jest.fn();

    fetch.resetMocks();
  });

  afterEach(() => {
    global.sessionStorage = origSessionStorage;
  });

  describe('should dispatch fetchDataset', () => {
    it('authorized', () => {
      savedAccessToken = 'user-authorized';
      fetch.mockResponses([
        JSON.stringify({
          components: {
            schemas: {
              'dcat-doc': mockSschema
            }
          }
        })
      ], [
        JSON.stringify(mockDataset), {
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
          ...mockDataset,
          etag: '666'
        }
      }];

      const store = mockStore();
      store.dispatch(fetchDataset('ois-95620')).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('not authorized', () => {
      savedAccessToken = 'user-not-authorized';
      fetch.mockResponses([
        JSON.stringify({
          components: {
            schemas: {
              'dcat-doc': mockSschema
            }
          }
        })
      ], [
        JSON.stringify(mockDataset), {
          status: 401,
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
        type: 'SET_MODAL_SUCCESS',
        modal: mockModel
      }];

      const store = mockStore();
      store.dispatch(fetchDataset('ois-95620')).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('should dispatch createDataset', () => {
    it('authorized', () => {
      savedAccessToken = 'user-authorized';
      fetch.mockResponses([
        JSON.stringify(mockDataset), {
          status: 201
        }
      ]);

      const expectedActions = [{
        type: 'CREATE_DATASET_SUCCESS'
      }];

      const store = mockStore();
      store.dispatch(createDataset(mockDataset)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('not authorized', () => {
      savedAccessToken = 'user-not-authorized';
      fetch.mockResponses([
        JSON.stringify(mockDataset), {
          status: 401
        }
      ]);

      const expectedActions = [{
        type: 'SET_MODAL_SUCCESS',
        modal: mockModel
      }];

      const store = mockStore();
      store.dispatch(createDataset(mockDataset)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('should dispatch emptyDataset', () => {
    it('authorized', () => {
      const expectedActions = [{
        type: 'EMPTY_DATASET_SUCCESS'
      }];

      const store = mockStore();
      store.dispatch(emptyDataset()); // .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      // });
    });
  });

  describe('should dispatch updateDataset', () => {
    it('authorized', () => {
      savedAccessToken = 'user-authorized';
      fetch.mockResponses([
        JSON.stringify(mockDataset), {
          status: 201
        }
      ]);

      const expectedActions = [];

      const store = mockStore();
      store.dispatch(updateDataset(mockDataset)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('not authorized', () => {
      savedAccessToken = 'user-not-authorized';
      fetch.mockResponses([
        JSON.stringify(mockDataset), {
          status: 401
        }
      ]);

      const expectedActions = [{
        type: 'SET_MODAL_SUCCESS',
        modal: mockModel
      }];

      const store = mockStore();
      store.dispatch(updateDataset(mockDataset)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('should dispatch removeDataset', () => {
    it('authorized', () => {
      savedAccessToken = 'user-authorized';
      fetch.mockResponses([
        JSON.stringify(mockDataset), {
          status: 204
        }
      ]);

      const expectedActions = [{
        type: 'REMOVE_DATASET_SUCCESS'
      }];

      const store = mockStore();
      store.dispatch(removeDataset(mockDataset)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('not authorized', () => {
      savedAccessToken = 'user-not-authorized';
      fetch.mockResponses([
        JSON.stringify(mockDataset), {
          status: 401
        }
      ]);

      const expectedActions = [{
        type: 'SET_MODAL_SUCCESS',
        modal: mockModel
      }];

      const store = mockStore();
      store.dispatch(removeDataset(mockDataset)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
