import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import dataset from './dataset';
import datasets from './datasets';
import modal from './modal';
import resource from './resource';
import resourceToDataset from './resourceToDataset';
import schema from './schema';
import uiDataset from './uiDataset';
import uiResource from './uiResource';

const appState = combineReducers({
  dataset,
  datasets,
  modal,
  resource,
  resourceToDataset,
  schema,
  uiDataset,
  uiResource,
  router: routerReducer
});

export default appState;
