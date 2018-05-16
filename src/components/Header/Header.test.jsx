import React from 'react';

import Header from './Header';

describe('The Header component', () => {
  let mockUrl = 'http://portal/redirect-url';
  let wrap;
  let origSessionStorage;

  beforeEach(() => {
    origSessionStorage = window.sessionStorage;

    window.sessionStorage = {
      getItem: () => mockUrl
    };
  });

  afterEach(() => {
    window.sessionStorage = origSessionStorage;
  });

  it('renders component with DCATD_LIST_REDIRECT_URL', () => {
    wrap = shallow(<Header />);

    expect(wrap).toMatchSnapshot();
  });

  it('renders component without DCATD_LIST_REDIRECT_URL', () => {
    mockUrl = null;

    wrap = shallow(<Header />);

    expect(wrap).toMatchSnapshot();
  });
});
