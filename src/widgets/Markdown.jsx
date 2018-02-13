import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextArea } from 'semantic-ui-react';
import ReactMarkdown from 'react-markdown';

class Markdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, { value }) {
    this.setState({ value });
  }

  render() {
    const { value } = this.state;

    return (
      <div>
        <TextArea
          id={this.props.id}
          className="form-control"
          placeholder={this.props.placeholder}
          disabled={this.props.disabled}
          readOnly={this.props.readonly}
          rows={this.props.options.rows}
          label={this.props.label}
          required={this.props.required}
          value={value}
          onChange={this.handleChange}
        />
        <ReactMarkdown
          source={value}
          className="form-control preview"
        />
      </div>
    );
  }
}

Markdown.defaultProps = {
  label: '',
  placeholder: '',
  options: {},
  rows: 3,
  // schema: {}
  value: ''
};

Markdown.propTypes = {
  disabled: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  readonly: PropTypes.bool.isRequired,
  rows: PropTypes.number,
  required: PropTypes.bool.isRequired,
  value: PropTypes.string
};

export default Markdown;
