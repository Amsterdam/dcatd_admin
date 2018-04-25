import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './index';

const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(thunk)
);

const state = store.getState();

describe('react jsonschema forms custom widgets', () => {
  it('should load File and Markdown widget', () => {
    expect(state.modal).toBeDefined();
    expect(state.dataset).toBeDefined();
    expect(state.datasets).toBeDefined();
    expect(state.resource).toBeDefined();
    expect(state.resourceToDataset).toBeDefined();
    expect(state.schema).toBeDefined();
    expect(state.uiDataset).toBeDefined();
    expect(state.uiResource).toBeDefined();
  });
});
