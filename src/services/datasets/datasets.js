const apiUrl = `https://${process.env.NODE_ENV !== 'production' ? 'acc.' : ''}api.data.amsterdam.nl/dcatd/datasets`;

export default function fetchDatasets() {
  return fetch(`${apiUrl}`)
    .then(response => response.json())
    .then(response => response['dcat:dataset'].map(dataset => ({
      id: dataset['dct:identifier'],
      title: dataset['dct:title'] || '',
      description: dataset['dct:description'] || ''
    })));
}
