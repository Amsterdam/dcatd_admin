import { setUiDatasetOrder } from '../uiDataset/uiDataset';
import { setUiResourceOrder } from '../uiResource/uiResource';
import api from '../../services/api/api';

export const FETCH_SCHEMA_SUCCESS = 'FETCH_SCHEMA_SUCCESS';

export function fetchSchemaSuccess(schema) {
  return {
    type: FETCH_SCHEMA_SUCCESS,
    schema
  };
}

export function fetchSchema() {
  return (dispatch) => {
    return fetch(api.schema)
      .then((response) => response.json())
      .then((response) => response.components.schemas['dcat-dataset'])
      .then((schema) => dispatch(fetchSchemaSuccess(schema)))
      .then((schema) => dispatch(setUiDatasetOrder(schema)))
      .then((schema) => dispatch(setUiResourceOrder(schema)))
      .catch((error) => { throw error; });
  };
}
