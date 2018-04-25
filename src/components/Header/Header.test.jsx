import React from 'react';

import Header from './Header';

describe('The Header component', () => {
  let wrap;

  beforeEach(() => {
    wrap = shallow(<Header />);
  });

  it('renders component', () => {
    expect(wrap).toMatchSnapshot();
  });
});
