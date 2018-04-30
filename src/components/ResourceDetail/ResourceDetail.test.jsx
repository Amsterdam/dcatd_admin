import React from 'react';

import ResourceDetail from './ResourceDetail';
import schema from './schema.json';

describe('The ResourceDetail component', () => {
  let wrap;
  let datasetTitle;
  let onSetResourceToDatasetSpy;
  let onEmptyResourceSpy;
  let setModalSpy;

  beforeEach(() => {
    setModalSpy = jest.fn();
    onEmptyResourceSpy = jest.fn();
    onSetResourceToDatasetSpy = jest.fn();
    datasetTitle = '';
    wrap = shallow((
      <ResourceDetail
        schema={schema}
        uiResource={{}}
        formData={{}}
        datasetTitle={datasetTitle}
        onSetResourceToDataset={onSetResourceToDatasetSpy}
        onEmptyResource={onEmptyResourceSpy}
        setModal={setModalSpy}
      />
    ));
  });

  describe('renders component', () => {
    it('renders default props', () => {
      expect(wrap).toMatchSnapshot();
    });
  });
});
