import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import File from './File';
import { shallow } from '../../../test/enzyme';

const middlewares = [thunk];

jest.mock('../../services/auth/auth.js');

describe('The File component (react-jsonschema-forms custom field)', () => {
  let oldXMLHttpRequest;
  let oldFormData;
  let store;
  let wrap;
  let xhrSpy;
  let appendSpy;

  beforeEach(() => {
    xhrSpy = {
      open: jest.fn(),
      setRequestHeader: jest.fn(),
      send: jest.fn(),
      onloadstart: jest.fn(),
      onload: jest.fn(),
      onprogress: jest.fn()
    };
    const xhrMock = () => ({
      open: xhrSpy.open,
      setRequestHeader: xhrSpy.setRequestHeader,
      send: xhrSpy.send,
      onloadstart: xhrSpy.onloadstart,
      onload: xhrSpy.onload,
      upload: { onprogress: xhrSpy.onprogress }
    });
    oldXMLHttpRequest = window.XMLHttpRequest;
    window.XMLHttpRequest = jest.fn().mockImplementation(xhrMock);

    appendSpy = jest.fn();
    const formDataMock = () => ({
      append: appendSpy
    });
    oldFormData = window.FormData;
    window.FormData = jest.fn().mockImplementation(formDataMock);

    const props = {
      id: 'very-unique-id',
      registry: {
        formContext: {
          setResourceSpecs: jest.fn(),
          setUploadStatus: jest.fn()
        }
      }
    };

    store = configureMockStore(middlewares)();
    wrap = shallow(<File {...props} />, { context: { store } }).dive();
  });

  afterEach(() => {
    window.XMLHttpRequest = oldXMLHttpRequest;
    window.FormData = oldFormData;
  });

  // describe('renders component', () => {
  //   it('renders default', () => {
  //     expect(wrap).toMatchSnapshot();
  //   });
  // });

  describe('triggering events', () => {
    it('start uploadig a file when a new file is added to file input', () => {
      const event = { target: { files: ['upload-file.pdf'] } };

      wrap.find('#very-unique-id-upload').props().onChange(event);

      expect(xhrSpy.open).toHaveBeenCalledWith('POST', 'https://acc.api.data.amsterdam.nl/dcatd/files', true);
      expect(xhrSpy.setRequestHeader).toHaveBeenCalled();
      expect(xhrSpy.send).toHaveBeenCalledWith({ append: expect.any(Function) });

      expect(appendSpy).toHaveBeenCalledWith('distribution', 'upload-file.pdf');
    });
  });

  it('will not start uploadig a file when a no file is added to file input', () => {
    const event = { target: { files: [] } };

    wrap.find('#very-unique-id-upload').props().onChange(event);

    expect(xhrSpy.open).not.toHaveBeenCalled();
    expect(xhrSpy.setRequestHeader).not.toHaveBeenCalled();
    expect(xhrSpy.send).not.toHaveBeenCalled();

    expect(appendSpy).not.toHaveBeenCalled();
  });
});
