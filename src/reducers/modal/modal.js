import { SET_MODAL_SUCCESS } from '../../actions/modal/modal';

const initialState = {
  actionLabel: 'OK',
  cancelLabel: 'Annuleren',
  content: 'Er gebeurt iets.',
  open: false,
  onProceed: () => {}
};

// eslint-disable-next-line default-param-last
export default function modal(state = initialState, action) {
  switch (action.type) {
    case SET_MODAL_SUCCESS:
      return {
        ...action.modal
      };

    default:
      return state;
  }
}
