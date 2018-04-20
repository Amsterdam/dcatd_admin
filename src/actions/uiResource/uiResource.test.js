import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchUiResource, setUiResourceOrder } from './uiResource';
import uiResource from '../../definitions/uiResource';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('uiResource actions', () => {
  it('should dispatch fetchUiResource', () => {
    const expectedActions = [
      {
        uiResource,
        type: 'FETCH_UI_RESOURCE_SUCCESS'
      }
    ];

    const store = mockStore();
    store.dispatch(fetchUiResource());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should dispatch setUiResourceOrder', () => {
    const expectedActions = [
      {
        type: 'SET_UI_RESOURCE_ORDER',
        'x-order': ['foo', 'bar']
      }
    ];

    const store = mockStore();
    store.dispatch(setUiResourceOrder({
      'x-order': ['foo', 'bar']
    }));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
