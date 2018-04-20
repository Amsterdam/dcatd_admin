import uiResource from './uiResource';

describe('uiResource reducer', () => {
  it('should handle initial state', () => {
    expect(
      uiResource(undefined, {})
    ).toEqual({
      'ui:order': []
    });
  });

  describe('FETCH_UI_RESOURCE_SUCCESS', () => {
    it('sets the uiResource state', () => {
      expect(
        uiResource({}, {
          type: 'FETCH_UI_RESOURCE_SUCCESS',
          uiResource: {
            'dct:description': {
              'ui:widget': 'textarea'
            }
          }
        })
      ).toEqual({
        'dct:description': {
          'ui:widget': 'textarea'
        }
      });
    });
  });

  describe('SET_UI_RESOURCE_ORDER', () => {
    it('sets the order in the uiResource state from incomming schema', () => {
      expect(
        uiResource({}, {
          type: 'SET_UI_RESOURCE_ORDER',
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
                  'x-order': ['dct:title', 'dct:description']
                }
              }
            },
            required: ['dct:title'],
            type: 'object'
          }
        })
      ).toEqual({
        'ui:order': ['dct:title', 'dct:description']
      });
    });
  });
});
