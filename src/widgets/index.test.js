import widgets from './index';

describe('react jsonschema forms custom widgets', () => {
  beforeAll(() => {
    global.scrollTo = jest.fn();
  });

  it('should load File and Markdown widget', () => {
    expect(widgets).toEqual({
      file: expect.any(Function),
      markdown: expect.any(Function)
    });
  });
});
