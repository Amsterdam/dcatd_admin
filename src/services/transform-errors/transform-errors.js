import errorsMap from '../../definitions/errors';

export default function (errors) {
  return errors.map((error) => {
    if (errorsMap[error.message]) {
      error.message = errorsMap[error.message];
    }
    console.log('transformErrors', errors);

    return error;
  });
}
