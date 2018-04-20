import uiDataset from './uiDataset';

describe('uiDataset reducer', () => {
  it('should handle initial state', () => {
    expect(
      uiDataset(undefined, {})
    ).toEqual({
      'ui:order': []
    });
  });

  describe('FETCH_UI_DATASET_SUCCESS', () => {
    it('sets the uiDataset state', () => {
      expect(
        uiDataset({}, {
          type: 'FETCH_UI_DATASET_SUCCESS',
          uiDataset: {
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

  describe('SET_UI_DATASET_ORDER', () => {
    it('sets the order in the uiDataset state from incomming schema', () => {
      expect(
        uiDataset({}, {
          type: 'SET_UI_DATASET_ORDER',
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
        'ui:order': ['dct:title', 'dct:description']
      });
    });
  });
});
