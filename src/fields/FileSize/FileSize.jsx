import React from 'react';
import PropTypes from 'prop-types';
import filesize from 'filesize';
import ReadOnly from '../ReadOnly/ReadOnly';

// Check https://github.com/avoidwork/filesize.js for options
const FileSize = ({ formData, options, ...props }) => (
  <ReadOnly
    {...props}
    formData={filesize(formData, options)}
  />
);

FileSize.defaultProps = {
  formData: 0,
  options: {}
};

FileSize.propTypes = {
  formData: PropTypes.number,
  options: PropTypes.object
};

export default FileSize;
