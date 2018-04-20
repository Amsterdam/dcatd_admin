import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { setModal } from './modal';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('modal actions', () => {
  it('should dispatch setModal', () => {
    const expectedActions = [
      {
        type: 'SET_MODAL_SUCCESS',
        modal: {
          actionLabel: 'Verwijderen',
          cancelLabel: null,
          content: 'Wil je dit echt?',
          open: true,
          onProceed: expect.any(Function)
        }
      }
    ];

    const store = mockStore();
    store.dispatch(setModal({
      actionLabel: 'Verwijderen',
      cancelLabel: null,
      content: 'Wil je dit echt?',
      open: true,
      onProceed: () => {}
    }));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
