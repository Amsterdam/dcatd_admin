import React from 'react';

import DatasetList from './DatasetList';

describe('The DatasetList component', () => {
  let wrap;

  const mockDatsets = [{
    id: 'luchtkwaliteit',
    title: 'Luchtkwaliteit'
  }, {
    id: 'meldingen-openbare-ruimte',
    titel: 'Meldingen Openbare Ruimte',
    description: 'Omschrijvng'
  }];

  beforeEach(() => {
    const props = {
      datasets: mockDatsets,
      onFetchDatasets: jest.fn()
    };
    wrap = shallow(<DatasetList {...props} />);
  });

  it('renders component', () => {
    expect(wrap).toMatchSnapshot();
  });
});
