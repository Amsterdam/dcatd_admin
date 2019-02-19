import resource from './resource';

describe('resource reducer', () => {
  beforeAll(() => {
    global.scrollTo = jest.fn();
  });
  it('should handle initial state', () => {
    expect(
      resource(undefined, {})
    ).toEqual({});
  });

  describe('SET_RESOURCE_SUCCESS', () => {
    it('sets the resource state', () => {
      expect(
        resource({}, {
          type: 'SET_RESOURCE_SUCCESS',
          resource: {
            '@id': '_:d1',
            'dct:title': 'Bewoners die zich veilig voelen in hun stad',
            'dcat:accessURL': 'http',
            'ams:resourceType': 'data',
            'ams:distributionType': 'file',
            'dcat:mediaType': 'application/vnd.ms-excel',
            'ams:classification': 'public'
          }
        })
      ).toEqual({
        '@id': '_:d1',
        'dct:title': 'Bewoners die zich veilig voelen in hun stad',
        'dcat:accessURL': 'http',
        'ams:resourceType': 'data',
        'ams:distributionType': 'file',
        'dcat:mediaType': 'application/vnd.ms-excel',
        'ams:classification': 'public',
        'dct:modified': expect.any(String)
      });
    });
  });

  describe('EMPTY_RESOURCE_SUCCESS', () => {
    it('empties the resource state', () => {
      expect(
        resource({}, {
          type: 'EMPTY_RESOURCE_SUCCESS',
          resource: {
            '@id': '_:d1',
            'dct:title': 'Bewoners die zich veilig voelen in hun stad',
            'dcat:accessURL': 'http',
            'ams:resourceType': 'data',
            'ams:distributionType': 'file',
            'dcat:mediaType': 'application/vnd.ms-excel',
            'ams:classification': 'public'
          }
        })
      ).toEqual({});
    });
  });
});
