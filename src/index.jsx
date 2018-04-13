import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware, push } from 'react-router-redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers';
import rootSaga from './sagas';
import App from './components/App';
import { fetchSchema } from './actions/schema';
import { fetchUiDataset } from './actions/uiDataset';
import { fetchUiResource } from './actions/uiResource';
import { initAuth, getReturnPath } from './services/auth/auth';

import './styling/config.scss';
import './index.scss';

const history = createHistory();
const router = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(
      thunk,
      sagaMiddleware,
      router
    )
  )
);

initAuth();
const returnPath = getReturnPath();
if (returnPath) {
  store.dispatch(push(returnPath));
}

sagaMiddleware.run(rootSaga);

store.dispatch({ type: 'FETCH_DATASETS_REQUEST' });
store.dispatch(fetchSchema());
store.dispatch(fetchUiDataset());
store.dispatch(fetchUiResource());

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
