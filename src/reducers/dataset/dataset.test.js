import dataset from './dataset';

describe('dataset reducer', () => {
  it('should handle initial state', () => {
    expect(
      dataset(undefined, {})
    ).toEqual({});
  });

  // describe('FETCH_DATASET_SUCCESS', () => {
  //   it('adds an dataset to an empty state', () => {
  //     expect(
  //       dataset([], {
  //         type: 'FETCH_DATASET_SUCCESS',
  //         dataset: {
  //           emailAddress: 'john@doe.com',
  //           name: 'John Doe',
  //           id: 0
  //         }
  //       })
  //     ).toEqual([
  //       {
  //         emailAddress: 'john@doe.com',
  //         name: 'John Doe',
  //         id: 0
  //       }
  //     ]);
  //   });
  // });

  // it('adds an dataset to a non-empty state', () => {
  //   expect(
  //     dataset([
  //       {
  //         emailAddress: 'john@doe.com',
  //         name: 'John Doe',
  //         active: true,
  //         id: 0
  //       }
  //     ], {
  //       type: 'FETCH_DATASET_SUCCESS',
  //       dataset: {
  //         emailAddress: 'jane@doe.com',
  //         name: 'Jane Doe',
  //         id: 1
  //       }
  //     })
  //   ).toEqual([
  //     {
  //       emailAddress: 'john@doe.com',
  //       name: 'John Doe',
  //       active: true,
  //       id: 0
  //     }, {
  //       emailAddress: 'jane@doe.com',
  //       name: 'Jane Doe',
  //       id: 1
  //     }
  //   ]);
  // });
  //
  // it('overwrites an existing dataset', () => {
  //   expect(
  //     dataset([
  //       {
  //         emailAddress: 'john@doe.com',
  //         name: 'John Doe',
  //         id: 0
  //       }
  //     ], {
  //       type: 'FETCH_DATASET_SUCCESS',
  //       dataset: {
  //         emailAddress: 'john@doe.com',
  //         name: 'Jane Doe',
  //         id: 1
  //       }
  //     })
  //   ).toEqual([
  //     {
  //       emailAddress: 'john@doe.com',
  //       name: 'Jane Doe',
  //       id: 1
  //     }
  //   ]);
  // });
});
