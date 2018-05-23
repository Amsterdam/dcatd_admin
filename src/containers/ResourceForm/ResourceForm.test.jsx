import React from 'react';

import Form from 'react-jsonschema-form';
import ResourceForm from './ResourceForm';
import schema from './schema.json';
import uiResource from '../../definitions/uiResource';

describe('The ResourceForm component', () => {
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
      wrap = shallow(<ResourceForm {...props} />);
      expect(wrap).toMatchSnapshot();
    });


    describe('handleCancel', () => {
      it('should go back', () => {
        wrap = shallow(<ResourceForm {...props} />);
        const backButton = wrap.find('.resource-form__back').first();
        expect(backButton).toBeTruthy();
        backButton.simulate('click');
        expect(props.onEmptyResource).toHaveBeenCalled();
      });

      it('should show modal when the updateStatus is busy (file is uploading) on cancel', () => {
        props = {
          ...props,
          uploadStatus: 'busy'
        };
        wrap = shallow(<ResourceForm {...props} />);
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
        wrap = shallow(<ResourceForm {...props} />);
        const cancelButton = wrap.find('.dcatd-form-button-cancel').first();
        expect(cancelButton.prop('type')).toBe('button');
        cancelButton.simulate('click');
        expect(props.setModal).not.toHaveBeenCalled();
        expect(props.onEmptyResource).toHaveBeenCalled();
      });

      it('should call setModal on cancel when dct:modified is changed', () => {
        props = {
          ...props,
          formData: {
            'dct:modified': '',
            'foaf:isPrimaryTopicOf': {}
          }
        };
        wrap = shallow(<ResourceForm {...props} />);
        const event = { formData: { 'dct:modified': 'modified', 'ams:distributionType': 'modified' } };
        wrap.instance().setResourceSpecs(event.formData);
        const cancelButton = wrap.find('.dcatd-form-button-cancel').first();
        cancelButton.simulate('click');
        expect(props.setModal).toHaveBeenCalled();
      });
    });


    describe('internal state manipulation', () => {
      let form;

      beforeEach(() => {
        props = {
          ...props,
          uiResource
        };

        wrap = shallow(<ResourceForm {...props} />);
        form = wrap.find(Form).first();
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

      describe('setVisibilityOfFields', () => {
        beforeEach(() => {
        });

        it('should show format when ams:distributionType is file', () => {
          const formData = { 'ams:distributionType': 'file' };
          wrap.instance().setVisibilityOfFields(formData);
          expect(wrap.state().uiResource['dct:format']['ui:widget']).toBe('select');
        });

        it('should show serviceType when ams:distributionType is api', () => {
          const formData = { 'ams:distributionType': 'api' };
          wrap.instance().setVisibilityOfFields(formData);
          expect(wrap.state().uiResource['ams:serviceType']['ui:widget']).toBe('select');
        });
      });
    });
  });
});