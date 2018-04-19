export const SET_MODAL_SUCCESS = 'SET_MODAL_SUCCESS';

function setModalSuccess(modal) {
  return {
    type: SET_MODAL_SUCCESS,
    modal
  };
}

export function setModal(modal) {
  return (dispatch) => {
    return dispatch(setModalSuccess(modal));
  };
}
