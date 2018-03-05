import { push } from 'react-router-redux';
import { getAuthHeaders } from '../services/auth/auth';

export const FETCH_DATASET_SUCCESS = 'FETCH_DATASET_SUCCESS';
export const REMOVE_DATASET_SUCCESS = 'REMOVE_DATASET_SUCCESS';

const apiUrl = `https://${process.env.NODE_ENV !== 'production' ? 'acc.' : ''}api.data.amsterdam.nl/dcatd/datasets`;

export function fetchDatasetSuccess(dataset) {
  return {
    type: FETCH_DATASET_SUCCESS,
    dataset
  };
}

export function fetchDataset(id) {
  return (dispatch) => { // eslint-disable-line
    console.log('fetchDataset', `${apiUrl}/${id}`);
    return fetch(`${apiUrl}/${id}`)
      .then(response => response.json())
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
        dispatch(push('/dcatd_admin/datasets'));
      })
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
        dispatch(push('/dcatd_admin/datasets'));
      })
      .catch((error) => { throw error; });
  };
}
