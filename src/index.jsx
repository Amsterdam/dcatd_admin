import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { Provider } from 'react-redux';
import { createBrowserHistory as createHistory } from 'history';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { HashRouter } from 'react-router-dom';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';
import App from './components/App/App';
import { fetchSchema } from './actions/schema/schema';
import { fetchUiDataset } from './actions/uiDataset/uiDataset';
import { fetchUiResource } from './actions/uiResource/uiResource';
import keycloak from './keycloak';
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

store.dispatch(fetchSchema());
store.dispatch(fetchUiDataset());
store.dispatch(fetchUiResource());
render(
  <ReactKeycloakProvider
    authClient={keycloak}
    initOptions={{
      checkLoginIframe: false,
      pkceMethod: 'S256',
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: `${window.location.origin}/`
    }}
  >
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </ReactKeycloakProvider>,
  document.getElementById('root')
);
