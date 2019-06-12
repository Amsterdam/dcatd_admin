import getNow from './get-now';

describe('getNow', () => {
  it('should return the right date', () => {
    global.Date.now = jest.fn(() => new Date('2017-06-13T04:41:20'));

    expect(getNow().toISOString().split('T')[0]).toEqual('2017-06-13');
  });
});
