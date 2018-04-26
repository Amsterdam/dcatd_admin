import React from 'react';

import ResourceDetail from './ResourceDetail';

describe('The ResourceDetail component', () => {
  let wrap;
  let datasetTitle;
  let onSetResourceToDatasetSpy;
  let onEmptyResourceSpy;
  let setModalSpy;

  const mockSchema = {
    type: 'array',
    default: [],
    items: {
      properties: {
        'ams:resourceType': {
          enum: ['data', 'doc', 'vis', 'app'],
          enumNames: ['Data', 'Documentatie', 'Visualisatie', 'Voorbeeldtoepassing']
        }
      }
    }
  };

  beforeEach(() => {
    setModalSpy = jest.fn();
    onEmptyResourceSpy = jest.fn();
    onSetResourceToDatasetSpy = jest.fn();
    datasetTitle = '';
    wrap = shallow((
      <ResourceDetail
        schema={mockSchema}
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

  // describe('triggering events', () => {
  //   let setResourceDetailSpy;
  //   let onProceedSpy;
  //
  //   beforeEach(() => {
  //     setResourceDetailSpy = jest.fn();
  //     onProceedSpy = jest.fn();
  //   });
  //
  //   it('clicking submit closes modal and triggers onProceed', () => {
  //     wrap.setProps({
  //       modal: {
  //         onProceed: onProceedSpy
  //       },
  //       setResourceDetail: setResourceDetailSpy
  //     });
  //
  //     wrap.find('.dcatd-form-button-submit').simulate('click');
  //
  //     expect(onProceedSpy).toHaveBeenCalled();
  //     expect(setResourceDetailSpy).toHaveBeenCalledWith({ open: false });
  //   });
  //
  //   it('clicking cancel closes modal', () => {
  //     wrap.setProps({
  //       setResourceDetail: setResourceDetailSpy
  //     });
  //
  //     wrap.find('.dcatd-form-button-cancel').simulate('click');
  //
  //     expect(onProceedSpy).not.toHaveBeenCalled();
  //     expect(setResourceDetailSpy).toHaveBeenCalledWith({ open: false });
  //   });
  // });
});
