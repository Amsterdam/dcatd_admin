import schema from './schema';

describe('schema reducer', () => {
  it('should handle initial state', () => {
    expect(
      schema(undefined, {})
    ).toEqual({
      properties: {},
      required: [],
      type: 'object',
      'x-order': []
    });
  });

  describe('FETCH_SCHEMA_SUCCESS', () => {
    it('sets the schema state and removes the pattern validation in all date fields', () => {
      expect(
        schema({}, {
          type: 'FETCH_SCHEMA_SUCCESS',
          schema: {
            properties: {
              'dct:title': {
                title: 'Titel',
                type: 'string'
              },
              'dct:description': {
                title: 'Beschrijving',
                type: 'string'
              },
              'dcat:distribution': {
                items: {
                  properties: {
                    'dct:modified': {
                      pattern: 'should_be_removed'
                    }
                  }
                }
              },
              'dct:temporal': {
                properties: {
                  'time:hasBeginning': {
                    pattern: 'should_be_removed'
                  },
                  'time:hasEnd': {
                    pattern: 'should_be_removed'
                  }
                }
              },
              'foaf:isPrimaryTopicOf': {
                properties: {
                  'dct:issued': {
                    pattern: 'should_be_removed'
                  },
                  'dct:modified': {
                    pattern: 'should_not_be_removed'
                  }
                }
              }
            },
            required: ['dct:title'],
            type: 'object',
            'x-order': ['dct:title', 'dct:description']
          }
        })
      ).toEqual({
        properties: {
          'dct:title': {
            title: 'Titel',
            type: 'string'
          },
          'dct:description': {
            title: 'Beschrijving',
            type: 'string'
          },
          'dcat:distribution': {
            items: {
              properties: {
                'dct:modified': {
                  // pattern: 'should_be_removed'
                }
              }
            }
          },
          'dct:temporal': {
            properties: {
              'time:hasBeginning': {
                // pattern: 'should_be_removed'
              },
              'time:hasEnd': {
                // pattern: 'should_be_removed'
              }
            }
          },
          'foaf:isPrimaryTopicOf': {
            properties: {
              'dct:issued': {
                // pattern: 'should_be_removed'
              },
              'dct:modified': {
                pattern: 'should_not_be_removed'
              }
            }
          }
        },
        required: ['dct:title'],
        type: 'object',
        'x-order': ['dct:title', 'dct:description']
      });
    });
  });
});
