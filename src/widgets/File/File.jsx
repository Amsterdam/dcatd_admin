import React from 'react';
import PropTypes from 'prop-types';

import './file.scss';

const apiUrl = `https://${process.env.NODE_ENV !== 'production' ? 'acc.' : ''}api.data.amsterdam.nl/dcatd/files`;

function processFile(files) {
  const f = files[0];
  const formData = new FormData();
  formData.append('distribution', f);

  const xhr = new XMLHttpRequest();
  console.log('starting...');

  xhr.onloadstart = () => {
    console.log('for real...');
  };

  xhr.upload.onprogress = (e) => {
    console.log('progress', e, e.loaded, e.total);
  };

  xhr.onload = () => {
    console.log('FINISH');
    // upload success
    if (xhr.readyState === 4 && (xhr.status === 201 || xhr.status === 200 || xhr.status === 0)) {
      // if your server sends a message on upload sucess,
      // get it with xhr.responseText
      console.log('LOCATION IN DATASTORE', xhr.getResponseHeader('Location'));
    }
  };

  xhr.open('POST', apiUrl, true);
  xhr.send(formData);
}

function File(props) {
  return (
    <input
      type="file"
      id={props.id}
      className="form-control"
      name="distribution"
      label={props.label}
      required={props.required}
      disabled={props.disabled}
      placeholder={props.placeholder}
      readOnly={props.readonly}

      onChange={event => processFile(event.target.files)}
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
  required: PropTypes.bool.isRequired

  // onChange: PropTypes.func.isRequired
};

export default File;
