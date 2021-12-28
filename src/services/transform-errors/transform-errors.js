import errorsMap from '../../definitions/errors';

export default function transformErrors(errors) {
  return errors.map((error) => {
    if (errorsMap[error.message]) {
      error.message = errorsMap[error.message];
    }

    return error;
  });
}
