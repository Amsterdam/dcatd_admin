// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import fetchMock from 'fetch-mock';
//
// // import api from '../../services/api/api';
// // import { fetchDatasets } from './datasets';
// // import { fetchSchema } from '../schema/schema';
//
// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);
//
// const mockResponse = (status, statusText, response) => {
//   return new window.Response(response, {
//     status,
//     statusText,
//     headers: {
//       'Content-type': 'application/json'
//     }
//   });
// };
// describe('datasets actions', () => {
//   afterEach(() => {
//     fetchMock.reset();
//     fetchMock.restore();
//   });
//
//   it('calls request and success actions if the fetch response was successful', () => {
//     const store = mockStore();
//
//     window.fetch = jest.fn().mockImplementation(() =>
//       Promise.resolve(mockResponse(200, null, '{"ids":{"provider":' + id + '}}' )));
//
//     return store.dispatch(fetchData(id))
//       .then(() => {
//         const expectedActions = store.getActions();
//         expect(expectedActions.length).toBe(2);
//         expect(expectedActions).toContainEqual({ type: types.FETCH_DATA_REQUEST });
//         expect(expectedActions).toContainEqual({ type: types.FETCH_DATA_SUCCESS, data });
//       })
//   });
//   /*
//
//   it('FETCH_DATASETS_SUCCESS', () => {
//     const store = mockStore();
//
//     // fetchSchema.mockResolvedValue(store.dispatch(() => ({
//     //   type: 'FETCH_SCHEMA_SUCCESS',
//     //   schema: {
//     //     foo: 'bar'
//     //   } })
//     // ));
//     //
//     fetchMock
//       // .getOnce(api.schema, {
//       //   body: {
//       //     components: {
//       //       schemas: {
//       //         'dcat-doc': {
//       //           foo: 'bar'
//       //         }
//       //       }
//       //     }
//       //   },
//       //   headers: {
//       //     'content-type': 'application/json'
//       //   }
//       // })
//       .getOnce(api.datasets, {
//         body: {
//           'dcat:dataset': [
//             {
//               '@id': 'ams-dcatd:ois-95620',
//               'dct:description': 'Tekst',
//               'dct:identifier': 'ois-95620',
//               'dct:title': 'De mooie titel'
//             }, {
//               '@id': 'ams-dcatd:fooo',
//               'dct:identifier': 'fooo'
//             }
//           ]
//         },
//         headers: {
//           'content-type': 'application/json'
//         }
//       });
//
//     const expectedActions = [{
//       type: 'FETCH_DATASETS_SUCCESS',
//       datasets: [
//         {
//           description: 'Tekst',
//           id: 'ois-95620',
//           title: 'De mooie titel'
//         }, {
//           description: '',
//           id: 'fooo',
//           title: ''
//         }
//       ]
//     }];
//
//     console.log('almost');
//     return store.dispatch(fetchDatasets()).then(() => {
//       // return of async actions
//       console.log('DONE');
//       expect(store.getActions()).toEqual(expectedActions);
//     });
//   });
//   */
// });
