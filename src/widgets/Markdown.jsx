import React from 'react';
import PropTypes from 'prop-types';

const Markdown = props => (
  <div>
    <textarea
      id={props.id}
      className="markdown-field"
      placeholder={props.placeholder}
      disabled={props.disabled}
      readOnly={props.readonly}
      label={props.label}
      value={props.value}
    />
    <div>{console.log(props, props.options, props.schema)}</div>
  </div>
);

Markdown.defaultProps = {
  label: '',
  placeholder: '',
  options: {},
  schema: {},
  value: ''
};

Markdown.propTypes = {
  // autofocus: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  readonly: PropTypes.bool.isRequired,
  // required: PropTypes.bool.isRequired,
  schema: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  value: PropTypes.string
};

export default Markdown;
