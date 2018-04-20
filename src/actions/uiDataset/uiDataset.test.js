import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchUiDataset, setUiDatasetOrder } from './uiDataset';
import uiDataset from '../../definitions/uiDataset';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('uiDataset actions', () => {
  it('should dispatch fetchUiDataset', () => {
    const expectedActions = [
      {
        type: 'FETCH_UI_DATASET_SUCCESS',
        uiDataset
      }
    ];

    const store = mockStore();
    store.dispatch(fetchUiDataset());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should dispatch setUiDatasetOrder', () => {
    const expectedActions = [
      {
        type: 'SET_UI_DATASET_ORDER',
        'x-order': ['foo', 'bar']
      }
    ];

    const store = mockStore();
    store.dispatch(setUiDatasetOrder({
      'x-order': ['foo', 'bar']
    }));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
