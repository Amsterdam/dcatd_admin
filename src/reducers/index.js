import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import datasets from './datasets';
import schema from './schema';
import uiDataset from './uiDataset';
import visibilityFilter from './visibilityFilter';

const appState = combineReducers({
  datasets,
  schema,
  uiDataset,
  visibilityFilter,
  router: routerReducer
});

export default appState;
