import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import datasets from './datasets';
import schema from './schema';
import visibilityFilter from './visibilityFilter';

const appState = combineReducers({
  datasets,
  schema,
  visibilityFilter,
  router: routerReducer
});

export default appState;
