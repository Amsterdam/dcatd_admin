import React from 'react';
import PropTypes from 'prop-types';

const ReadOnly = ({ formData, schema, uiSchema }) => {
  const title = (uiSchema && uiSchema['ui:options'] && uiSchema['ui:options'].title) || schema.title || '';
  const placeholder = (uiSchema && uiSchema['ui:placeholder']) || '';

  return (uiSchema && uiSchema['ui:widget'] !== 'hidden') ? (
    <div>
      <strong className="control-label">{title || schema.title}</strong>
      <div>{formData || placeholder}</div>
    </div>
  ) : '';
};

ReadOnly.defaultProps = {
  formData: '',
  uiSchema: null
};

ReadOnly.propTypes = {
  formData: PropTypes.string,
  schema: PropTypes.object.isRequired,
  uiSchema: PropTypes.object
};

export default ReadOnly;
