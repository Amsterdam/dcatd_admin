import React from 'react';

import DatasetDetail from './DatasetDetail';
import schema from './schema.json';

describe('The DatasetDetail component', () => {
  let wrap;
  let datasetTitle;
  let setModalSpy;

  beforeEach(() => {
    setModalSpy = jest.fn();
    datasetTitle = '';
    wrap = shallow((
      <DatasetDetail
        schema={schema}
        uiDataset={{}}
        formData={{}}
        datasetTitle={datasetTitle}
        setModal={setModalSpy}
      />
    ));
  });

  describe('renders component', () => {
    it('renders default props', () => {
      expect(wrap).toMatchSnapshot();
    });
  });

  // describe('triggering events', () => {
  //   it('clicking cancel opens modal', () => {
  //     console.log('--------------', wrap.find('.resource-title'));
  //   });
  // });
});
