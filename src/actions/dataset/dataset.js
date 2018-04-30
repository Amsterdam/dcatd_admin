// import { push } from 'react-router-redux';
import { getAuthHeaders } from '../../services/auth/auth';
import serverError from '../../services/server-error/server-error';
import { fetchSchema } from '../schema/schema';
import api from '../../services/api/api';

export const FETCH_DATASET_SUCCESS = 'FETCH_DATASET_SUCCESS';
export const CREATE_DATASET_SUCCESS = 'CREATE_DATASET_SUCCESS';
export const EMPTY_DATASET_SUCCESS = 'EMPTY_DATASET_SUCCESS';
export const REMOVE_DATASET_SUCCESS = 'REMOVE_DATASET_SUCCESS';

export function fetchDatasetSuccess(dataset) {
  return {
    type: FETCH_DATASET_SUCCESS,
    dataset
  };
}

export function fetchDataset(id) {
  let serverResponse = { ok: false };
  let etag = '';
  return (dispatch) => {
    return dispatch(fetchSchema()).then(() => {
      return fetch(`${api.datasets}/${id}`)
        .then((response) => {
          serverResponse = response;
          etag = response.headers.get('etag');
          return response.json();
        })
        .then(dataset => dispatch(serverResponse.ok ? fetchDatasetSuccess({
          ...dataset,
          etag
        }) : serverError(serverResponse)))
        .catch((error) => { throw error; });
    });
  };
}

export function createDatasetSuccess() {
  return {
    type: CREATE_DATASET_SUCCESS
  };
}

export function createDataset(dataset) {
  // POST: 201
  return (dispatch) => {
    return fetch(api.datasets, {
      method: 'POST',
      body: JSON.stringify(dataset),
      headers: new Headers({
        ...getAuthHeaders(),
        'Content-Type': 'application/hal+json',
        'If-None-Match': '*'
      })
    })
      .then(response =>
        dispatch(response.ok ? createDatasetSuccess(dataset) : serverError(response)))
      .then(() => {
        // dispatch(push('/dcatd_admin/datasets'));
        window.location.hash = '/datasets';
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
  // PUT: 204
  return (dispatch) => {
    return fetch(`${api.datasets}/${dataset['dct:identifier']}`, {
      method: 'PUT',
      body: JSON.stringify(dataset),
      headers: new Headers({
        ...getAuthHeaders(),
        'Content-Type': 'application/hal+json',
        'If-Match': dataset.etag
      })
    })
      .then(response =>
        dispatch(response.ok ? emptyDataset() : serverError(response)))
      .then(() => {
        // dispatch(push('/dcatd_admin/datasets'));
        window.location.hash = '/datasets';
      })
      .catch((error) => { throw error; });
  };
}

export function removeDatasetSuccess() {
  return {
    type: REMOVE_DATASET_SUCCESS
  };
}

export function removeDataset(dataset) {
  // DELETE: 204
  return (dispatch) => {
    return fetch(`${api.datasets}/${dataset['dct:identifier']}`, {
      method: 'DELETE',
      headers: new Headers({
        ...getAuthHeaders(),
        'If-Match': dataset.etag
      })
    })
      .then(response =>
        dispatch(response.ok ? removeDatasetSuccess() : serverError(response)))
      .then(() => {
        // dispatch(push('/dcatd_admin/datasets'));
        window.location.hash = '/datasets';
      })
      .catch((error) => { throw error; });
  };
}
