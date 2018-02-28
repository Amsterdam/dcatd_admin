import React from 'react';
import PropTypes from 'prop-types';

import './file.scss';

function processFile(files) {
  const f = files[0];
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = event => resolve(event.target.result);
    reader.readAsDataURL(f);
  });
}

function File(props) {
  return (
    <input
      type="file"
      id={props.id}
      className="form-control"
      label={props.label}
      required={props.required}
      disabled={props.disabled}
      placeholder={props.placeholder}
      readOnly={props.readonly}

      onChange={event => processFile(event.target.files).then(props.onChange)}
    />
  );
}

File.defaultProps = {
  label: '',
  placeholder: ''
};

File.propTypes = {
  disabled: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  readonly: PropTypes.bool.isRequired,
  required: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};

export default File;
