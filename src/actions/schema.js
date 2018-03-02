import { setUiDatasetOrder } from './uiDataset';
import { setUiResourceOrder } from './uiResource';

export const FETCH_SCHEMA_SUCCESS = 'FETCH_SCHEMA_SUCCESS';

const apiUrl = `https://${process.env.NODE_ENV !== 'production' ? 'acc.' : ''}api.data.amsterdam.nl/dcatd/openapi`;

export function fetchSchemaSuccess(schema) {
  return {
    type: FETCH_SCHEMA_SUCCESS,
    schema
  };
}

export function fetchSchema() {
  return (dispatch) => { // eslint-disable-line
    return fetch(apiUrl)
      .then(response => response.json())
      .then(response => response.components.schemas['dcat-doc'])
      .then(schema => dispatch(fetchSchemaSuccess(schema)))
      .then(schema => dispatch(setUiDatasetOrder(schema)))
      .then(schema => dispatch(setUiResourceOrder(schema)))
      .catch((error) => { throw error; });
  };
}
