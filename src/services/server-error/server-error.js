import { setModal } from '../../actions/modal';

export default function serverError(response) {
  return setModal({
    actionLabel: 'OK',
    cancelLabel: null,
    content: `Fout: ${response.status}: ${response.statusText}. U bent niet (meer) bevoegd tot het uitvoeren van deze actie.
  Wellicht komt dit doordat:
  1. uw sessie is verlopen. Deze duurt maximaal 10 uur.
  2. u niet bevoegd bent om datasets te beheren.`,
    open: true,
    onProceed: () => {}
  });
}
