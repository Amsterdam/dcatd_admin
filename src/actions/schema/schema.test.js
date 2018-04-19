// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import fetchMock from 'fetch-mock';
//
// import api from '../../services/api/api';
// import { fetchSchema } from './schema';
//
// import { setUiDatasetOrder } from '../uiDataset';
// import { setUiResourceOrder } from '../uiResource';
//
// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);
//
// jest.mock('../uiDataset');
// jest.mock('../uiResource');
//
// describe('schema actions', () => {
//   afterEach(() => {
//     fetchMock.reset();
//     fetchMock.restore();
//   });
//
//   it('FETCH_SCHEMA_SUCCESS', () => {
//     fetchMock
//       .getOnce(api.schema, {
//         body: {
//           components: {
//             schemas: {
//               'dcat-doc': {
//                 foo: 'bar'
//               }
//             }
//           }
//         },
//         headers: {
//           'content-type': 'application/json'
//         }
//       });
//
//     const expectedActions = [{
//       type: 'FETCH_SCHEMA_SUCCESS',
//       schema: {
//         foo: 'bar'
//       }
//     }];
//
//     const store = mockStore();
//
//     return store.dispatch(fetchSchema()).then(() => {
//       // return of async actions
//       expect(store.getActions()).toEqual(expectedActions);
//     });
//   });
// });
