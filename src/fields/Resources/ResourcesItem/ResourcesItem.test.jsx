import React from 'react';

import ResourcesItem from './ResourcesItem';

const mockSchema = {
  'dct:format': {
    enum: [
      'n/a',
      'text/csv',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.geo+json',
      'application/gml+xml',
      'text/html',
      'application/json',
      'application/pdf',
      'image/png',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/xml',
      'application/octet-stream'
    ],
    enumNames: ['', 'CSV', 'DOCX', 'GeoJSON', 'GML', 'HTML', 'JSON', 'PDF', 'PNG', 'XLS', 'XLSX', 'XML', 'Anders']
  }
};

describe('The ResourcesItem component', () => {
  it('renders with title, description, format, file size and date', () => {
    const resource = {
      'dct:title': 'Titel',
      'dcat:accessURL': 'http://ergens',
      'dct:description': 'omschrijving',
      'dct:format': 'application/pdf',
      'dcat:byteSize': '666',
      'foaf:isPrimaryTopicOf': {
        'dct:modified': '2017-11-30'
      }
    };

    const wrap = shallow(
      <ResourcesItem
        resource={resource}
        schemaProps={mockSchema}
      />
    );

    expect(wrap).toMatchSnapshot();
  });

  it('renders with title and url: showing url in place of description', () => {
    const resource = {
      'dct:title': 'Titel',
      'dcat:accessURL': 'http://ergens',
      'dct:format': 'n/a',
      'foaf:isPrimaryTopicOf': {}
    };

    const wrap = shallow(
      <ResourcesItem
        resource={resource}
        schemaProps={mockSchema}
      />
    );

    expect(wrap).toMatchSnapshot();
  });
});
