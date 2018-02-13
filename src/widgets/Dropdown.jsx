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

  handleAddition(e, { value }) {
    this.setState({
      options: [{ text: value, value }, ...this.state.options]
    });
  }

  handleChange(e, { value }) {
    this.setState({ value });
  }

  render() {
    const { value, options } = this.state;

    return (
      <div>
        <SemanticDropdown
          id={this.props.id}
          placeholder={this.props.placeholder}
          allowAdditions={this.props.options.allowAdditions}
          disabled={this.props.disabled}
          fluid
          multiple={this.props.options.multiple}
          readOnly={this.props.readonly}
          search
          selection
          options={options}
          value={value}
          onAddItem={this.handleAddition}
          onChange={this.handleChange}
        />
        <div>{console.log(this.props)}</div>
      </div>
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
  // autofocus: PropTypes.bool.isRequired,
  allowAdditions: PropTypes.bool,
  disabled: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  options: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  placeholder: PropTypes.string,
  readonly: PropTypes.bool.isRequired,
  // required: PropTypes.bool.isRequired,
  schema: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  value: PropTypes.string
  // onChange: PropTypes.func.isRequired
};

export default Dropdown;
