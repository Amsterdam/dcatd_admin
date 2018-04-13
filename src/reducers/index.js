import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import dataset from './dataset';
import datasets from './datasets';
import modal from './modal';
import resource from './resource';
import schema from './schema';
import uiDataset from './uiDataset';
import uiResource from './uiResource';
import visibilityFilter from './visibilityFilter';

const appState = combineReducers({
  dataset,
  datasets,
  modal,
  resource,
  schema,
  uiDataset,
  uiResource,
  visibilityFilter,
  router: routerReducer
});

export default appState;
