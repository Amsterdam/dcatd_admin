// import datasets from './datasets';
//
// describe('datasets reducer', () => {
//   it('should handle initial state', () => {
//     expect(
//       datasets(undefined, {}).length
//     ).toBe(0);
//   });
//
//   describe('FETCH_DATASET_SUCCESS', () => {
//     it('adds an dataset to an empty state', () => {
//       expect(
//         datasets([], {
//           type: 'FETCH_DATASET_SUCCESS',
//           dataset: {
//             emailAddress: 'john@doe.com',
//             name: 'John Doe',
//             id: 0
//           }
//         })
//       ).toEqual([
//         {
//           emailAddress: 'john@doe.com',
//           name: 'John Doe',
//           id: 0
//         }
//       ]);
//     });
//
//     it('adds an dataset to a non-empty state', () => {
//       expect(
//         datasets([
//           {
//             emailAddress: 'john@doe.com',
//             name: 'John Doe',
//             active: true,
//             id: 0
//           }
//         ], {
//           type: 'FETCH_DATASET_SUCCESS',
//           dataset: {
//             emailAddress: 'jane@doe.com',
//             name: 'Jane Doe',
//             id: 1
//           }
//         })
//       ).toEqual([
//         {
//           emailAddress: 'john@doe.com',
//           name: 'John Doe',
//           active: true,
//           id: 0
//         }, {
//           emailAddress: 'jane@doe.com',
//           name: 'Jane Doe',
//           id: 1
//         }
//       ]);
//     });
//
//     it('overwrites an existing dataset', () => {
//       expect(
//         datasets([
//           {
//             emailAddress: 'john@doe.com',
//             name: 'John Doe',
//             id: 0
//           }
//         ], {
//           type: 'FETCH_DATASET_SUCCESS',
//           dataset: {
//             emailAddress: 'john@doe.com',
//             name: 'Jane Doe',
//             id: 1
//           }
//         })
//       ).toEqual([
//         {
//           emailAddress: 'john@doe.com',
//           name: 'Jane Doe',
//           id: 1
//         }
//       ]);
//     });
//   });
// });
