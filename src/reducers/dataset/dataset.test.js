import dataset from './dataset';

describe('dataset reducer', () => {
  const mockDataset = {
    '@id': 'ams-dcatd:ois-95620',
    'dct:description': 'Mooie dataset, zeg',
    'dct:identifier': 'ois-95620',
    'dct:title': 'Openbare orde en veiligheid (Amsterdam in Europa)',
    'dcat:distribution': ['foo', 'bar'],
    etag: '666'
  };

  it('should handle initial state', () => {
    expect(
      dataset(undefined, {})
    ).toEqual({});
  });

  describe('FETCH_DATASET_SUCCESS', () => {
    it('saves a dataset', () => {
      expect(
        dataset({}, {
          type: 'FETCH_DATASET_SUCCESS',
          dataset: mockDataset
        })
      ).toEqual(mockDataset);
    });
  });

  describe('EMPTY_DATASET_SUCCESS', () => {
    it('empties the dataset', () => {
      expect(
        dataset({}, {
          type: 'EMPTY_DATASET_SUCCESS',
          dataset: mockDataset
        })
      ).toEqual({
        'foaf:isPrimaryTopicOf': {
          'dct:issued': expect.any(String),
          'dct:modified': expect.any(String)
        }
      });
    });
  });

  describe('CREATE_DATASET_SUCCESS', () => {
    it('empties the dataset', () => {
      expect(
        dataset({}, {
          type: 'CREATE_DATASET_SUCCESS',
          dataset: mockDataset
        })
      ).toEqual({});
    });
  });

  describe('UPDATE_DATASET_SUCCESS', () => {
    it('empties the dataset', () => {
      expect(
        dataset({}, {
          type: 'UPDATE_DATASET_SUCCESS',
          dataset: mockDataset
        })
      ).toEqual({});
    });
  });

  describe('CANCEL_DATASET_SUCCESS', () => {
    it('empties the dataset', () => {
      expect(
        dataset({}, {
          type: 'CANCEL_DATASET_SUCCESS',
          dataset: mockDataset
        })
      ).toEqual({});
    });
  });

  describe('REMOVE_DATASET_SUCCESS', () => {
    it('empties the dataset', () => {
      expect(
        dataset({}, {
          type: 'REMOVE_DATASET_SUCCESS',
          dataset: mockDataset
        })
      ).toEqual({});
    });
  });
});
