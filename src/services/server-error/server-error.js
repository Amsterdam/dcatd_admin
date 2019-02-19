import { setModal } from '../../actions/modal/modal';

export default function serverError(response) {
  return setModal({
    actionLabel: 'OK',
    cancelLabel: null,
    content: (response && response.status === 403) ? 'AUTH_ERROR' : 'SERVER_ERROR',
    open: true,
    onProceed: () => {}
  });
}
