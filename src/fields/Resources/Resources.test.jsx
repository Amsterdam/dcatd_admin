import React from 'react';

import Resources from './Resources';

const mockDate = '2019-01-01T11:01:58.135Z';
const modified = mockDate.split('T')[0];

const mockResources = [{
  'dct:title': 'Data via maps.amsterdam.nl',
  'dct:description': 'Let op!',
  'dcat:accessURL': 'http://maps.amsterdam.nl/open_geodata/',
  'ams:purl': 'http://acc.maps.amsterdam.nl/open_geodata/',
  'ams:resourceType': 'data',
  'ams:distributionType': 'file',
  'dcat:mediaType': 'text/csv',
  'ams:classification': 'public',
  'foaf:isPrimaryTopicOf': { 'dct:issued': '2017-02-02', 'dct:modified': modified },
  '@id': '_:d1'
},
{
  'dct:title': 'Weergave op kaart',
  'dcat:accessURL': 'http://maps.amsterdam.nl/markten/',
  'ams:purl': 'http://acc.maps.amsterdam.nl/markten/',
  'ams:resourceType': 'vis',
  'ams:distributionType': 'file',
  'dcat:mediaType': 'text/html',
  'dct:modified': modified,
  'ams:classification': 'public',
  'foaf:isPrimaryTopicOf': { 'dct:issued': '2017-02-02', 'dct:modified': modified },
  '@id': '_:d2'
}];

const mockSchema = {
  type: 'array',
  default: [],
  items: {
    properties: {
      'ams:resourceType': {
        enum: ['data', 'doc', 'vis', 'app'],
        enumNames: ['Data', 'Documentatie', 'Visualisatie', 'Voorbeeldtoepassing']
      }
    }
  }
};

describe('The Resources component (react-jsonschema-forms custom field)', () => {
  beforeEach(() => {
    global.Date.now = jest.fn(() => new Date(mockDate).valueOf());
  });

  describe('renders component', () => {
    it('renders two resources', () => {
      const wrap = shallow(
        <Resources
          resources={mockResources}
          schema={mockSchema}
        />
      );

      expect(wrap).toMatchSnapshot();
    });
  });

  describe('triggering events', () => {
    it('add resource event', () => {
      const spy = jest.fn();
      const mockFormContext = {
        handleSetResource: spy
      };

      const wrap = shallow(
        <Resources
          resources={mockResources}
          schema={mockSchema}
          formContext={mockFormContext}
        />
      );

      wrap.find('.resources-button-new').first().simulate('click');
      expect(spy).toHaveBeenCalledWith({
        'ams:classification': 'public',
        'ams:resourceType': 'data',
        'dct:modified': expect.any(String),
        'foaf:isPrimaryTopicOf': {
          'dct:issued': expect.any(String),
          'dct:modified': expect.any(String)
        }
      });
    });

    it('edit resource event', () => {
      const spy = jest.fn();
      const mockFormContext = {
        handleSetResource: spy
      };

      const wrap = shallow(
        <Resources
          resources={mockResources}
          schema={mockSchema}
          formContext={mockFormContext}
        />
      );

      wrap.setState({
        resources: mockResources
      });

      wrap.find('.resources-button-edit').last().simulate('click', { preventDefault: jest.fn() });
      expect(spy).toHaveBeenCalledWith(mockResources[1]);
    });
  });
});
