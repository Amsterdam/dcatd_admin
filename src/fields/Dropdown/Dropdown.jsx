import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown as SemanticDropdown } from 'semantic-ui-react';

import './dropdown.scss';

class Dropdown extends Component {
  static getOptions(items) {
    if (items.examples) {
      return items.examples.map(
        (option) => ({
          value: option,
          text: option
        })
      );
    }
    return items.enum.map(
      (option, index) => ({
        value: option,
        text: items.enumNames[index]
      })
    );
  }

  constructor(props) {
    super(props);

    this.state = {
      options: Dropdown.getOptions(props.schema.items || props.schema),
      value: props.formData
    };

    this.handleAddition = this.handleAddition.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.setState({
      value: props.formData
    });
  }

  handleAddition(event, { value }) {
    this.setState((state) => ({
      options: [{ text: value, value }, ...state.options]
    }));
  }

  handleChange(event, { value }) {
    this.setState({ value });
    if (typeof value === 'string') {
      this.props.onChange(value || undefined);
    } else {
      this.props.onChange(value.length > 0 ? value : undefined);
    }
  }

  render() {
    const { value, options } = this.state;
    return (
      <span>
        <label
          className="control-label"
          htmlFor={this.props.idSchema.$id}
        >
          {this.props.schema.title}
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
  formData: []
};

Dropdown.propTypes = {
  disabled: PropTypes.bool.isRequired,
  idSchema: PropTypes.object.isRequired,
  readonly: PropTypes.bool.isRequired,
  required: PropTypes.bool.isRequired,
  schema: PropTypes.object.isRequired,
  uiSchema: PropTypes.object.isRequired,
  formData: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  onChange: PropTypes.func.isRequired
};

export default Dropdown;
