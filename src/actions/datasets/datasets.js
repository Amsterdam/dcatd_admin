import { fetchSchema } from '../schema/schema';
import api from '../../services/api/api';

export const FETCH_DATASETS_SUCCESS = 'FETCH_DATASETS_SUCCESS';
export const FETCH_DATASETS_FAILURE = 'FETCH_DATASETS_FAILURE';

export function fetchDatasetsSuccess(datasets) {
  return {
    type: FETCH_DATASETS_SUCCESS,
    datasets
  };
}

export function fetchDatasetsFailure(error) {
  return { type: FETCH_DATASETS_FAILURE, error };
}

export function fetchDatasets() {
  return (dispatch) => {
    return dispatch(fetchSchema()).then(() => {
      return fetch(api.datasets)
        .then((response) => response.json())
        .then((response) => response['dcat:dataset'].map((dataset) => ({
          id: dataset['dct:identifier'],
          title: dataset['dct:title'] || '',
          description: dataset['dct:description'] || ''
        })))
        .then((datasets) => dispatch(fetchDatasetsSuccess(datasets)));
    }).catch((error) => dispatch(fetchDatasetsFailure(error)));
  };
}
