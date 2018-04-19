// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import fetchMock from 'fetch-mock';
//
// import api from '../../services/api/api';
// import { fetchDataset, createDataset } from './dataset';
//
// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);
//
// describe('dataset actions', () => {
//   afterEach(() => {
//     fetchMock.reset();
//     fetchMock.restore();
//   });
//
//   it('FETCH_DATASET_SUCCESS with etag', () => {
//     fetchMock
//       .getOnce(`${api.datasets}/ams-dcatd:ois-95620`, {
//         body: {
//           '@id': 'ams-dcatd:ois-95620',
//           'dct:description': 'Tekst',
//           'dct:identifier': 'ois-95620',
//           'dct:title': 'De mooie titel'
//         },
//         headers: {
//           'content-type': 'application/json',
//           etag: '666'
//         }
//       });
//
//     const expectedActions = [{
//       type: 'FETCH_DATASET_SUCCESS',
//       dataset: {
//         '@id': 'ams-dcatd:ois-95620',
//         'dct:description': 'Tekst',
//         'dct:identifier': 'ois-95620',
//         'dct:title': 'De mooie titel',
//         etag: '666'
//       }
//     }];
//
//     const store = mockStore();
//
//     return store.dispatch(fetchDataset('ams-dcatd:ois-95620')).then(() => {
//       // return of async actions
//       expect(store.getActions()).toEqual(expectedActions);
//     });
//   });
//
//   it('CREATE_DATASET_SUCCESS', () => {
//     fetchMock
//       .postOnce(api.datasets, {
//         headers: {
//           'content-type': 'application/hal+json'
//         }
//       });
//
//     const expectedActions = [{
//       type: 'CREATE_DATASET_SUCCESS'
//     }];
//
//     const store = mockStore();
//
//     return store.dispatch(createDataset({
//       '@id': 'ams-dcatd:ois-95620',
//       'dct:description': 'Tekst',
//       'dct:identifier': 'ois-95620',
//       'dct:title': 'De mooie titel'
//     })).then(() => {
//       // return of async actions
//       expect(store.getActions()).toEqual(expectedActions);
//     });
//   });
// });
