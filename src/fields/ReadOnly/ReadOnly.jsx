import React from 'react';
import PropTypes from 'prop-types';

const ReadOnly = ({ formData, schema, uiSchema }) => (
  <div>
    <strong
      className="control-label"
    >
      {
        (uiSchema && uiSchema['ui:options'] && uiSchema['ui:options'].title) ?
          uiSchema['ui:options'].title :
          (schema.title || '')
      }
    </strong>
    <div>{formData}</div>
  </div>
);

ReadOnly.defaultProps = {
  formData: '',
  formContext: {},
  uiSchema: null
};

ReadOnly.propTypes = {
  formData: PropTypes.string,
  schema: PropTypes.object.isRequired,
  uiSchema: PropTypes.object
};

export default ReadOnly;
