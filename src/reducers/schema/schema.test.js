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
    it('sets the schema state', () => {
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
          }
        },
        required: ['dct:title'],
        type: 'object',
        'x-order': ['dct:title', 'dct:description']
      });
    });
  });
});
