import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';

import App from './App';
import DatasetsContainer from '../../containers/DatasetsContainer';

const middlewares = [thunk];
const store = configureMockStore(middlewares)();

const renderRoutes = path =>
  mount(
    <MemoryRouter initialEntries={[path]}>
      <Provider store={store}>
        <App />
      </Provider>
    </MemoryRouter>
  );

describe('The Modal component', () => {
  describe('renders component', () => {
    it('loads DatasetsContainer when valid url of existing dataset is used', () => {
      const wrap = renderRoutes('/datasets/adrian');
      expect(wrap.find(DatasetsContainer).length).toBe(1);
      expect(wrap.instance().history.location.pathname).toBe('/datasets/adrian');
    });

    it('loads DatasetsContainer when valid url of new dataset is used', () => {
      const wrap = renderRoutes('/datasets/_');
      expect(wrap.find(DatasetsContainer).length).toBe(1);
      expect(wrap.instance().history.location.pathname).toBe('/datasets/_');
    });

    it('renders default props', () => {
      const wrap = renderRoutes('/not-avlaibale');
      expect(wrap.find(DatasetsContainer).length).toBe(0);
    });

    it('redirects / to /datasets', () => {
      const wrap = renderRoutes('/');
      expect(wrap.instance().history.location.pathname).toBe('/datasets');
    });

    it('redirects /dcatd_admin to /datasets', () => {
      const wrap = renderRoutes('/dcatd_admin');
      expect(wrap.instance().history.location.pathname).toBe('/datasets');
    });
  });
});
