import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import dataset from './dataset/dataset';
import datasets from './datasets/datasets';
import modal from './modal/modal';
import resource from './resource/resource';
import resourceToDataset from './resourceToDataset/resourceToDataset';
import schema from './schema/schema';
import uiDataset from './uiDataset/uiDataset';
import uiResource from './uiResource/uiResource';

const rootReducer = combineReducers({
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

export default rootReducer;
