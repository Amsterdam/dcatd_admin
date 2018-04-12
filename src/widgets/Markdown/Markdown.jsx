import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextArea } from 'semantic-ui-react';
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

  handleChange(event, { value }) {
    this.setState({ value });
    this.props.onChange(value || undefined);
  }

  render() {
    const { value } = this.state;

    return (
      <div className="markdown">
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
          source={value || 'preview'}
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
  value: ''
};

Markdown.propTypes = {
  disabled: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.object,
  readonly: PropTypes.bool.isRequired,
  rows: PropTypes.number,
  required: PropTypes.bool.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default Markdown;
