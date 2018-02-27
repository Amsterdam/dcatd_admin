import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import accounts from './accounts';
import schema from './schema';
import visibilityFilter from './visibilityFilter';

const appState = combineReducers({
  accounts,
  schema,
  visibilityFilter,
  router: routerReducer
});

export default appState;
