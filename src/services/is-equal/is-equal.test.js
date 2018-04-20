import isEqual from './is-equal';

describe('The is-equal service checks if two objects are the same or not', () => {
  it('order of elements is not relevant and deep nested', () => {
    expect(isEqual({
      b: 2,
      array: ['one', 'two'],
      foo: {
        bar: {
          baz: 'yo',
          z: 666
        }
      }
    }, {
      foo: {
        bar: {
          z: 666,
          baz: 'yo'
        }
      },
      b: 2,
      array: ['one', 'two']
    })).toBeTruthy();

    expect(isEqual({
      b: 2,
      foo: {
        bar: {
          baz: 'yo',
          z: 333
        }
      }
    }, {
      foo: {
        bar: {
          z: 666,
          baz: 'yo'
        }
      },
      b: 2
    })).toBeFalsy();
  });

  it('it can process objects that have missing props', () => {
    expect(isEqual({
      b: 2,
      foo: {
        bar: {
          baz: 'yo',
          z: 666
        }
      }
    }, {
      foo: {
        bar: {
          baz: null,
          z: undefined
        }
      }
    })).toBeFalsy();
  });

  it('it can recursively ignore props', () => {
    expect(isEqual({
      b: 2,
      foo: {
        bar: {
          baz: 'yo'
        }
      }
    }, {
      foo: {
        bar: {
          baz: null,
          z: undefined
        }
      }
    }, ['b', 'bar'])).toBeTruthy();
  });
});
