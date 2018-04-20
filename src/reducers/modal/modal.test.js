import modal from './modal';

describe('modal reducer', () => {
  it('should handle initial state', () => {
    expect(
      modal(undefined, {})
    ).toEqual({
      actionLabel: 'OK',
      cancelLabel: 'Annuleren',
      content: 'Er gebeurt iets.',
      open: false,
      onProceed: expect.any(Function)
    });
  });

  describe('SET_MODAL_SUCCESS', () => {
    it('sets the new modal state', () => {
      expect(
        modal({}, {
          type: 'SET_MODAL_SUCCESS',
          modal: {
            actionLabel: 'Verwijderen',
            cancelLabel: null,
            content: 'Wil je dit echt?',
            open: true,
            onProceed: () => {}
          }
        })
      ).toEqual({
        actionLabel: 'Verwijderen',
        cancelLabel: null,
        content: 'Wil je dit echt?',
        open: true,
        onProceed: expect.any(Function)
      });
    });
  });
});
