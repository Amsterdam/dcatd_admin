import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown as SemanticDropdown } from 'semantic-ui-react';

import './dropdown.scss';

class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: this.getOptions(props.schema.items || props.schema),
      value: props.value
    };

    this.handleAddition = this.handleAddition.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getOptions(items) {
    console.log(this);
    if (items.examples) {
      return items.examples.map(
        option => ({
          value: option,
          text: option
        }));
    }
    return items.enum.map(
      (option, index) => ({
        value: option,
        text: items.enumNames[index]
      }));
  }

  handleAddition(event, { value }) {
    this.setState({
      options: [{ text: value, value }, ...this.state.options]
    });
  }

  handleChange(event, { value }) {
    this.setState({ value });
    this.props.onChange(value);
  }

  render() {
    const { value, options } = this.state;

    return (
      <span>
        <label
          className="control-label"
          htmlFor={this.props.idSchema.$id}
        >{this.props.schema.title}
          {this.props.required ? <span className="required">*</span> : ''}
        </label>
        <SemanticDropdown
          id={this.props.idSchema.$id}
          className="form-control"
          placeholder={this.props.uiSchema['ui:placeholder']}
          allowAdditions={this.props.uiSchema['ui:options'].allowAdditions}
          additionLabel="Voeg toe: "
          disabled={this.props.disabled}
          fluid
          multiple={this.props.uiSchema['ui:options'].multiple}
          readOnly={this.props.readonly}
          required={this.props.required}
          search
          noResultsMessage="Geen resultaten"
          selection
          options={options}
          value={value}
          onAddItem={this.handleAddition}
          onChange={this.handleChange}
        />
      </span>
    );
  }
}

Dropdown.defaultProps = {
  allowAdditions: false,
  label: '',
  value: ''
};

Dropdown.propTypes = {
  disabled: PropTypes.bool.isRequired,
  idSchema: PropTypes.object.isRequired,
  readonly: PropTypes.bool.isRequired,
  required: PropTypes.bool.isRequired,
  schema: PropTypes.object.isRequired,
  uiSchema: PropTypes.object.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default Dropdown;
