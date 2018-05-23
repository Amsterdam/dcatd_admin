import React from 'react';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';

import DatasetsContainer from './DatasetsContainer';

import { fetchDataset, emptyDataset, createDataset, cancelDataset, removeDataset, updateDataset }
  from '../actions/dataset/dataset';
import { setResourceToDataset } from '../actions/resourceToDataset/resourceToDataset';
import { emptyResource, setResource } from '../actions/resource/resource';
import { setModal } from '../actions/modal/modal';

jest.mock('../actions/dataset/dataset');
jest.mock('../actions/resourceToDataset/resourceToDataset');
jest.mock('../actions/resource/resource');
jest.mock('../actions/modal/modal');

const middlewares = [thunk];

describe('DatasetContainer', () => {
  let store;
  let wrap;

  beforeEach(() => {
    fetchDataset.mockImplementation(() => ({ type: 'FETCH_DATASET_SUCCESS' }));
    emptyDataset.mockImplementation(() => ({ type: 'EMPTY_DATASET_SUCCESS' }));
    createDataset.mockImplementation(() => ({ type: 'CREATE_DATASET_SUCCESS' }));
    cancelDataset.mockImplementation(() => ({ type: 'CANCEL_DATASET_SUCCESS' }));
    removeDataset.mockImplementation(() => ({ type: 'REMOVE_DATASET_SUCCESS' }));
    updateDataset.mockImplementation(() => ({ type: 'UPDATE_DATASET_SUCCESS' }));
    emptyResource.mockImplementation(() => ({ type: 'EMPTY_RESOURCE_SUCCESS' }));
    setResource.mockImplementation(() => ({ type: 'SET_RESOURCE_SUCCESS' }));
    setModal.mockImplementation(() => ({ type: 'SET_MODAL_SUCCESS' }));
    setResourceToDataset.mockImplementation(() => ({ type: 'SET_RESOURCE_TO_DATASET_SUCCESS' }));
  });

  afterEach(() => {
    fetchDataset.mockReset();
    emptyDataset.mockReset();
    cancelDataset.mockReset();
    cancelDataset.mockReset();
    removeDataset.mockReset();
    updateDataset.mockReset();
    emptyResource.mockReset();
    setResource.mockReset();
    setModal.mockReset();
    setResourceToDataset.mockReset();
  });

  describe('renders component', () => {
    it('renders default props', () => {
      store = configureMockStore(middlewares)();
      wrap = shallow(<DatasetsContainer />, { context: { store } }).dive();
      expect(wrap).toMatchSnapshot();
    });
  });
});
