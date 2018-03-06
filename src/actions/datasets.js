export const FETCH_DATASETS_SUCCESS = 'FETCH_DATASETS_SUCCESS';

const apiUrl = `https://${process.env.NODE_ENV !== 'production' ? 'acc.' : ''}api.data.amsterdam.nl/dcatd/datasets`;

export function fetchDatasetsSuccess(datasets) {
  return {
    type: FETCH_DATASETS_SUCCESS,
    datasets
  };
}

export function fetchDatasets() {
  return (dispatch) => {
    return fetch(`${apiUrl}`)
      .then(response => response.json())
      .then(response => response['dcat:dataset'].map(dataset => ({
        id: dataset['dct:identifier'],
        title: dataset['dct:title'] || '',
        description: dataset['dct:description'] || ''
      })))
      .then(datasets => dispatch(fetchDatasetsSuccess(datasets)))
      .catch((error) => { throw error; });
  };
}
