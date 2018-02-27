import { push } from 'react-router-redux';
import { getAuthHeaders } from '../services/auth/auth';
import checkAuthStatus from '../services/check-auth-status/check-auth-status';

export const FETCH_DATASET_SUCCESS = 'FETCH_DATASET_SUCCESS';
export const FETCH_DATASETS_SUCCESS = 'FETCH_DATASETS_SUCCESS';
export const REMOVE_DATASET_SUCCESS = 'REMOVE_DATASET_SUCCESS';

const apiUrl = `https://${process.env.NODE_ENV !== 'production' ? 'acc.' : ''}api.data.amsterdam.nl/dcatd/datasets`;

export function fetchDatasetSuccess(dataset) {
  return {
    type: FETCH_DATASET_SUCCESS,
    dataset
  };
}

export function fetchDataset(dataset) {
  return (dispatch) => { // eslint-disable-line
    return fetch(`${apiUrl}/${dataset.emailAddress}`, { headers: getAuthHeaders() })
      .then(checkAuthStatus())
      .then(response => response.json())
      .then(response => ({
        etag: response._etag,
        emailAddress: response._links.self.name,
        name: response._links.self.title
      }))
      .then(response => dispatch(fetchDatasetSuccess(response)))
      .catch((error) => { throw error; });
  };
}

export function createDataset(dataset) {
  return (dispatch) => { // eslint-disable-line
    return fetch(`${apiUrl}/${dataset.emailAddress}`, {
      method: 'PUT',
      body: JSON.stringify({
        _links: {
          // role: dataset.roles
        },
        name: dataset.emailAddress,
        title: dataset.name
      }),
      headers: new Headers({
        ...getAuthHeaders(),
        'Content-Type': 'application/hal+json',
        'If-None-Match': '*'
      })
    })
      .then(() => dispatch(fetchDataset(dataset)))
      .then(() => {
        // TODO: Find alternative approach letting the container handle this
        dispatch(push('/datasets'));
      })
      .catch((error) => { throw error; });
  };
}

export function fetchDatasetsSuccess(datasets) {
  return {
    type: FETCH_DATASETS_SUCCESS,
    datasets
  };
}

export function fetchDatasets() {
  return (dispatch) => { // eslint-disable-line
    return fetch(`${apiUrl}`, { headers: getAuthHeaders() })
      .then(checkAuthStatus())
      .then(response => response.json())
      // .then(response => response._embedded.item)
      .then(response => response.map(dataset => ({
        etag: dataset._etag,
        emailAddress: dataset._links.self.name,
        name: dataset._links.self.title
      })))
      .then(datasets => dispatch(fetchDatasetsSuccess(datasets)))
      .catch((error) => { throw error; });
  };
}

export function updateDataset(dataset) {
  return (dispatch) => { // eslint-disable-line
    return fetch(`${apiUrl}/${dataset.emailAddress}`, {
      method: 'PUT',
      body: JSON.stringify({
        _links: {
          // role: dataset.roles
        },
        name: dataset.emailAddress,
        title: dataset.name
      }),
      headers: new Headers({
        ...getAuthHeaders(),
        'Content-Type': 'application/hal+json',
        'If-Match': dataset.etag
      })
    })
      .then(() => dispatch(fetchDataset(dataset)))
      .then(() => {
        // TODO: Find alternative approach letting the container handle this
        dispatch(push('/datasets'));
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
  return (dispatch) => { // eslint-disable-line
    return fetch(`${apiUrl}/${dataset.emailAddress}`, {
      method: 'DELETE',
      headers: new Headers({
        ...getAuthHeaders(),
        'If-Match': dataset.etag
      })
    })
      .then(() => dispatch(removeDatasetSuccess(dataset)))
      .then(() => {
        // TODO: Find alternative approach letting the container handle this
        dispatch(push('/datasets'));
      })
      .catch((error) => { throw error; });
  };
}
