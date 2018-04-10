import { SET_MODAL_SUCCESS } from '../actions/modal';

const initialState = {
  actionLabel: 'OK',
  content: 'Er gebeurt iets.',
  open: false,
  onProceed: () => {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_MODAL_SUCCESS:
      return {
        ...action.modal
      };

    default:
      return state;
  }
}
