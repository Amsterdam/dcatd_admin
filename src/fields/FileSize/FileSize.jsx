import React from 'react';
import PropTypes from 'prop-types';
import filesize from 'filesize';
import ReadOnly from '../ReadOnly/ReadOnly';

// Check https://github.com/avoidwork/filesize.js for options
const FileSize = ({ formData, schema, uiSchema, formContext, options }) => (
  <ReadOnly
    formContext={formContext}
    schema={schema}
    uiSchema={uiSchema}
    formData={filesize(formData, options)}
  />
);

FileSize.defaultProps = {
  formData: 0,
  formContext: {},
  options: {},
  uiSchema: {}
};

FileSize.propTypes = {
  formData: PropTypes.number,
  schema: PropTypes.object.isRequired,
  uiSchema: PropTypes.object,
  options: PropTypes.object,
  formContext: PropTypes.object
};

export default FileSize;
