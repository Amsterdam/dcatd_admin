import { setModal } from '../../actions/modal/modal';

export default function serverError() {
  return setModal({
    actionLabel: 'OK',
    cancelLabel: null,
    content: 'SERVER_ERROR',
    open: true,
    onProceed: () => {}
  });
}
