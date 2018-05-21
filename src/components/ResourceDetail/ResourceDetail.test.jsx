import React from 'react';

import ResourceDetail from './ResourceDetail';
import schema from './schema.json';
import uiResource from '../../definitions/uiResource';

describe('The ResourceDetail component', () => {
  let props;
  let wrap;

  beforeEach(() => {
    props = {
      schema,
      uiResource: {},
      onSetResourceToDataset: jest.fn(),
      onEmptyResource: jest.fn(),
      setModal: jest.fn()
    };
  });

  describe('renders component', () => {
    it('renders default props', () => {
      wrap = shallow(<ResourceDetail {...props} />);
      expect(wrap).toMatchSnapshot();
    });

    it('should show modal when the updateStatus is busy (file is uploading) on cancel', () => {
      props = {
        ...props,
        uploadStatus: 'busy'
      };
      wrap = shallow(<ResourceDetail {...props} />);
      const cancelButton = wrap.find('.dcatd-form-button-cancel').first();
      expect(cancelButton.prop('type')).toBe('button');
      cancelButton.simulate('click');
      expect(props.setModal).toHaveBeenCalled();
      expect(props.setModal.mock.calls[0][0].actionLabel).toBe('Uploaden afbreken');
    });

    it('should call empty resource when nothing changed on cancel', () => {
      props = {
        ...props
      };
      wrap = shallow(<ResourceDetail {...props} />);
      const cancelButton = wrap.find('.dcatd-form-button-cancel').first();
      expect(cancelButton.prop('type')).toBe('button');
      cancelButton.simulate('click');
      expect(props.setModal).not.toHaveBeenCalled();
      expect(props.onEmptyResource).toHaveBeenCalled();
    });

    // it('should call setModal on cancel when dct:modified is changed', () => {
    //   props = {
    //     ...props,
    //     formData: {
    //       'dct:modified': '',
    //       'foaf:isPrimaryTopicOf': {}
    //     }
    //   };
    //   wrap = shallow(<ResourceDetail {...props} />);
    //   const event = { formData: { 'dct:modified': 'modified' } };
    //   wrap.instance().setResourceSpecs(event.formData);
    //   const cancelButton = wrap.find('.dcatd-form-button-cancel').first();
    //   cancelButton.simulate('click');
    //   expect(props.setModal).toHaveBeenCalled();
    // });

    describe('internal state manipulation', () => {
      let form;

      beforeEach(() => {
        props = {
          ...props,
          uiResource
        };

        wrap = shallow(<ResourceDetail {...props} />);
        form = wrap.find('Form').first();
        wrap.instance().setVisibilityOfFields = jest.fn();
      });

      it('should create the form', () => {
        expect(form).toBeTruthy();
      });

      describe('handleChange', () => {
        beforeEach(() => {
          wrap.instance().setVisibilityOfFields = jest.fn();
        });

        it('should have no effect on visibility of fields when formData[ams:distributionType] is not changed', () => {
          // arrange
          const event = { formData: { 'dct:modified': 'modified' } };

          // act
          form.simulate('change', event);

          // assert
          expect(wrap.instance().setVisibilityOfFields).not.toHaveBeenCalled();
        });

        it('should call setVisibilityOfFields when formData[ams:distributionType] is changed', () => {
          const event = { formData: { 'ams:distributionType': 'modified' } };
          form.simulate('change', event);
          expect(wrap.instance().setVisibilityOfFields).toHaveBeenCalled();
        });
      });

      // describe('setVisibilityOfFields', () => {
      //   beforeEach(() => {
      //   });

      //   it('should show format when ams:distributionType is file', () => {
      //     const formData = { 'ams:distributionType': 'file' };
      //     wrap.instance().setVisibilityOfFields(formData);

      //     expect(wrap.state.uiResource['dct:format']['ui:widget']).toBe('select');
      //   });
      // });
    });

  });
});
