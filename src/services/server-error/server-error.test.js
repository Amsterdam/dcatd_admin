import serverError from './server-error';
import * as modal from '../../actions/modal/modal';

jest.mock('../../actions/modal/modal');

describe('The server-error service', () => {
  it('it dispatches a modal with server error message', () => {
    const spy = jest.spyOn(modal, 'setModal');

    serverError();

    expect(spy).toHaveBeenCalledWith({
      actionLabel: 'OK',
      cancelLabel: null,
      content: 'SERVER_ERROR',
      onProceed: expect.any(Function),
      open: true
    });

    spy.mockReset();
    spy.mockRestore();
  });
});
