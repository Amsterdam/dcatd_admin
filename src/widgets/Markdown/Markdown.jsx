import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import './markdown.scss';

class Markdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      value: props.value
    });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    this.props.onChange(event.target.value || undefined);
  }

  render() {
    const { value } = this.state;

    return (
      <div className="markdown">
        <textarea
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
          source={value || 'preview'}
          className="markdown__preview"
        />
      </div>
    );
  }
}

Markdown.defaultProps = {
  disabled: false,
  label: '',
  placeholder: '',
  options: {},
  readonly: false,
  required: false,
  rows: 3,
  value: '',
  onChange: () => {}
};

Markdown.propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.object,
  readonly: PropTypes.bool,
  rows: PropTypes.number,
  required: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default Markdown;
