import React from 'react';
import PropTypes from 'prop-types';

const MarkdownField = props => (
  <textarea
    id={props.id}
    className="markdown-field"
    placeholder={props.placeholder}
    label={props.label}
  >{props.value}</textarea>
);

MarkdownField.defaultProps = {
  label: '',
  placeholder: '',
  // schema: {},
  value: ''
};

MarkdownField.propTypes = {
  // autofocus: PropTypes.bool.isRequired,
  // disabled: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  // readonly: PropTypes.bool.isRequired,
  // required: PropTypes.bool.isRequired,
  // schema: PropTypes.object,
  value: PropTypes.string
};

export default MarkdownField;
