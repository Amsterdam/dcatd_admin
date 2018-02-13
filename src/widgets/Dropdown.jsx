import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown as SemanticDropdown } from 'semantic-ui-react';

class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: props.schema.enum.map(
        (option, index) => ({
          value: option,
          text: props.schema.enumNames[index]
        })),
      value: props.value
    };

    this.handleAddition = this.handleAddition.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleAddition(event, { value }) {
    this.setState({
      options: [{ text: value, value }, ...this.state.options]
    });
  }

  handleChange(event, { value }) {
    this.setState({ value });
  }

  render() {
    const { value, options } = this.state;

    return (
      <SemanticDropdown
        id={this.props.id}
        className="form-control"
        placeholder={this.props.placeholder}
        allowAdditions={this.props.options.allowAdditions}
        disabled={this.props.disabled}
        fluid
        multiple={this.props.options.multiple}
        readOnly={this.props.readonly}
        required={this.props.required}
        search
        selection
        options={options}
        value={value}
        onAddItem={this.handleAddition}
        onChange={this.handleChange}
      />
    );
  }
}

Dropdown.defaultProps = {
  allowAdditions: false,
  label: '',
  options: {},
  placeholder: '',
  schema: {},
  value: ''
};

Dropdown.propTypes = {
  allowAdditions: PropTypes.bool,
  disabled: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  options: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  placeholder: PropTypes.string,
  readonly: PropTypes.bool.isRequired,
  required: PropTypes.bool.isRequired,
  schema: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  value: PropTypes.string
};

export default Dropdown;
