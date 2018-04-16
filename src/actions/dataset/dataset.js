import { push } from 'react-router-redux';
import { getAuthHeaders } from '../../services/auth/auth';
import serverError from '../../services/server-error/server-error';

export const FETCH_DATASET_SUCCESS = 'FETCH_DATASET_SUCCESS';
export const EMPTY_DATASET_SUCCESS = 'EMPTY_DATASET_SUCCESS';
export const REMOVE_DATASET_SUCCESS = 'REMOVE_DATASET_SUCCESS';

export const apiUrl = `https://${process.env.NODE_ENV !== 'production' ? 'acc.' : ''}api.data.amsterdam.nl/dcatd/datasets`;

export function fetchDatasetSuccess(dataset) {
  return {
    type: FETCH_DATASET_SUCCESS,
    dataset
  };
}

export function fetchDataset(id) {
  let etag = '';
  return (dispatch) => {
    return fetch(`${apiUrl}/${id}`)
      .then((response) => {
        etag = response.headers.get('etag');
        return response.json();
      })
      .then(response => dispatch(fetchDatasetSuccess({
        ...response,
        etag
      })))
      .catch((error) => { throw error; });
  };
}

export function createDataset(dataset) {
  return (dispatch) => {
    return fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify(dataset),
      headers: new Headers({
        ...getAuthHeaders(),
        'Content-Type': 'application/hal+json',
        'If-None-Match': '*'
      })
    })
      .then((response) => {
        if (!response.ok) {
          dispatch(serverError(response));
        }
      })
      .then(() => {
        // TODO: Find alternative approach letting the container handle this
        dispatch(push('/dcatd_admin/datasets'));
      })
      .catch((error) => { throw error; });
  };
}

export function emptyDatasetSuccess() {
  return {
    type: EMPTY_DATASET_SUCCESS
  };
}

export function emptyDataset() {
  return (dispatch) => {
    return dispatch(emptyDatasetSuccess());
  };
}

export function updateDataset(dataset) {
  return (dispatch) => {
    return fetch(`${apiUrl}/${dataset['dct:identifier']}`, {
      method: 'PUT',
      body: JSON.stringify(dataset),
      headers: new Headers({
        ...getAuthHeaders(),
        'Content-Type': 'application/hal+json',
        'If-Match': dataset.etag
      })
    })
      .then((response) => {
        if (!response.ok) {
          dispatch(serverError(response));
        }
      })
      .then(() => dispatch(fetchDataset(dataset['dct:identifier'])))
      .then(() => {
        // TODO: Find alternative approach letting the container handle this
        dispatch(push('/dcatd_admin/datasets'));
      })
      .catch((error) => { throw error; });
  };
}

export function removeDatasetSuccess(dataset) {
  return {
    type: REMOVE_DATASET_SUCCESS,
    dataset
  };
}

export function removeDataset(dataset) {
  return (dispatch) => {
    return fetch(`${apiUrl}/${dataset['dct:identifier']}`, {
      method: 'DELETE',
      headers: new Headers({
        ...getAuthHeaders(),
        'If-Match': dataset.etag
      })
    })
      .then((response) => {
        if (!response.ok) {
          dispatch(serverError(response));
        }
      })
      .then(() => dispatch(removeDatasetSuccess(dataset)))
      .then(() => {
        // TODO: Find alternative approach letting the container handle this
        dispatch(push('/dcatd_admin/datasets'));
      })
      .catch((error) => { throw error; });
  };
}
