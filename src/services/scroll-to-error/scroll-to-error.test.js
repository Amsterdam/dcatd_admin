/**
 * @jest-environment jsdom-global
 */

import scrollToError from './scroll-to-error';

describe('scrollToError', () => {
  const elementMock = {
    scrollIntoView: jest.fn()
  };

  beforeAll(() => {
    const noop = () => { return elementMock; };
    jest.spyOn(global.document, 'querySelector').mockImplementation(noop);
  });

  it('should scroll in the document', () => {
    scrollToError();
    expect(global.document.querySelector).toHaveBeenCalledWith('.field-error');
    expect(elementMock.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });
});
