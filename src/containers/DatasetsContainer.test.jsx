import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import DatasetsContainer from './DatasetsContainer';

const middlewares = [thunk];

describe('The Modal component', () => {
  let store;
  let wrap;

  beforeEach(() => {
    store = configureMockStore(middlewares)();
    wrap = shallow(<DatasetsContainer />, { context: { store } }).dive();
  });

  describe('renders component', () => {
    it('renders default props', () => {
      expect(wrap).toMatchSnapshot();
    });
  });
});
