import datasets from './datasets';
import { createDatasetSuccess, updateDatasetSuccess, removeDatasetSuccess } from '../../actions/dataset/dataset';

describe('datasets reducer', () => {
  it('should handle initial state', () => {
    expect(
      datasets(undefined, {}).length
    ).toBe(0);
  });

  describe('FETCH_DATASETS_SUCCESS', () => {
    it('fetches a list of datasets', () => {
      expect(
        datasets([], {
          type: 'FETCH_DATASETS_SUCCESS',
          datasets: [{
            title: 'dataset 1'
          }, {
            title: 'dataset 2'
          }]
        })
      ).toEqual([{
        title: 'dataset 1'
      }, {
        title: 'dataset 2'
      }]);
    });
  });

  describe('modification actions on a dataset', () => {
    it('should initialize the datasets list on createDatasetSuccess', () => {
      expect(datasets([{}], createDatasetSuccess({}))).toEqual([]);
    });

    it('should initialize the datasets list on createDatasetSuccess', () => {
      expect(datasets([{}], updateDatasetSuccess({}))).toEqual([]);
    });

    it('should initialize the datasets list on createDatasetSuccess', () => {
      expect(datasets([{}], removeDatasetSuccess({}))).toEqual([]);
    });
  });
});
