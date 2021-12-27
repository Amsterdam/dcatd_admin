import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { Provider } from 'react-redux';
import { createBrowserHistory as createHistory } from 'history';
import { HashRouter } from 'react-router-dom';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';
import App from './components/App/App';
import { fetchSchema } from './actions/schema/schema';
import { fetchUiDataset } from './actions/uiDataset/uiDataset';
import { fetchUiResource } from './actions/uiResource/uiResource';
import { initAuth } from './services/auth/auth';

import './styling/config.scss';
import './index.scss';

const history = createHistory();
const router = routerMiddleware(history);
const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunk,
      router
    )
  )
);

const doc = document;

initAuth().then(() => {
  console.log(doc);
  console.log(document);
  store.dispatch(fetchSchema());
  store.dispatch(fetchUiDataset());
  store.dispatch(fetchUiResource());
  render(
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>,
    document.getElementById('root')
  );
  document.replaceChild(doc, document.documentElement);
});
