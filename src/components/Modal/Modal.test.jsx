import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Modal from './Modal';

const middlewares = [thunk];

describe('The Modal component', () => {
  let store;
  let wrap;

  beforeEach(() => {
    store = configureMockStore(middlewares)();
    wrap = shallow(<Modal />, { context: { store } }).dive();
  });

  // TODO This fails
  // describe('renders component', () => {
  //   it('renders default props', () => {
  //     expect(wrap).toMatchSnapshot();
  //   });

  //   it('renders SERVER_ERROR', () => {
  //     wrap.setProps({
  //       modal: {
  //         actionLabel: 'OK',
  //         cancelLabel: null,
  //         content: 'SERVER_ERROR',
  //         onProceed: expect.any(Function),
  //         open: true
  //       }
  //     });

  //     expect(wrap).toMatchSnapshot();
  //   });
  // });

  describe('triggering events', () => {
    let setModalSpy;
    let onProceedSpy;

    beforeEach(() => {
      setModalSpy = jest.fn();
      onProceedSpy = jest.fn();
    });

    it('clicking submit closes modal and triggers onProceed', () => {
      wrap.setProps({
        modal: {
          onProceed: onProceedSpy
        },
        setModal: setModalSpy
      });

      wrap.find('.dcatd-form-button-submit').simulate('click');

      expect(onProceedSpy).toHaveBeenCalled();
      expect(setModalSpy).toHaveBeenCalledWith({ open: false });
    });

    it('clicking cancel closes modal', () => {
      wrap.setProps({
        setModal: setModalSpy
      });

      wrap.find('.dcatd-form-button-cancel').simulate('click');

      expect(onProceedSpy).not.toHaveBeenCalled();
      expect(setModalSpy).toHaveBeenCalledWith({ open: false });
    });
  });
});
