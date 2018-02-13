import React from 'react';
import PropTypes from 'prop-types';
import { TextArea } from 'semantic-ui-react';

const Markdown = props => (
  <div>
    <TextArea
      id={props.id}
      className="form-control"
      placeholder={props.placeholder}
      disabled={props.disabled}
      readOnly={props.readonly}
      rows={props.options.rows}
      label={props.label}
    />
    <div>{console.log('MARKDOWN', props)}</div>
  </div>
);

Markdown.defaultProps = {
  label: '',
  placeholder: '',
  options: {},
  rows: 3
  // schema: {}
  // value: ''
};

Markdown.propTypes = {
  // autofocus: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  readonly: PropTypes.bool.isRequired,
  rows: PropTypes.number
  // required: PropTypes.bool.isRequired,
  // schema: PropTypes.object // eslint-disable-line react/forbid-prop-types
  // value: PropTypes.string
};

export default Markdown;
