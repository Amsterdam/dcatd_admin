import resourceToDataset from './resourceToDataset';

describe('resourceToDataset reducer', () => {
  it('should handle initial state', () => {
    expect(
      resourceToDataset(undefined, {})
    ).toEqual({});
  });

  describe('SET_RESOURCE_TO_DATASET_SUCCESS', () => {
    it('sets the resourceToDataset state to pass the edited resource to the dataset', () => {
      expect(
        resourceToDataset({}, {
          type: 'SET_RESOURCE_TO_DATASET_SUCCESS',
          resource: {
            '@id': '_:d1',
            'dct:title': 'Bewoners die zich veilig voelen in hun stad',
            'dcat:accessURL': 'http',
            'ams:resourceType': 'data',
            'ams:distributionType': 'file',
            'dct:format': 'application/vnd.ms-excel',
            'ams:classification': 'public'
          }
        })
      ).toEqual({
        '@id': '_:d1',
        'dct:title': 'Bewoners die zich veilig voelen in hun stad',
        'dcat:accessURL': 'http',
        'ams:resourceType': 'data',
        'ams:distributionType': 'file',
        'dct:format': 'application/vnd.ms-excel',
        'ams:classification': 'public'
      });
    });
  });
});
