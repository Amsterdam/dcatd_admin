import React from 'react';
import PropTypes from 'prop-types';
// import { NavLink } from 'react-router-dom';
// import { Header } from 'semantic-ui-react';
// import DatasetForm from './DatasetForm/DatasetForm';

import Form from 'react-jsonschema-form';
import extraFields from 'react-jsonschema-form-extras';

import schema from './DatasetForm/json-schema.json';
import uiSchema from './DatasetForm/uiSchema';
import formDatas from './DatasetForm/dcatData';

import localFields from '../fields';
import widgets from '../widgets';

import '../../node_modules/react-day-picker/lib/style.css';
import './dcatd-form.scss';

const fields = {
  ...extraFields,
  ...localFields
};

// use the order defined in the schema
uiSchema['ui:order'] = schema['x-order'] || [];

class DatasetDetail extends React.Component {
  constructor(props) {
    super(props);

    // NB: Setting state of nested objects, i.e. `{ dataset: { name: '' } }`, is not supported
    this.state = {
      etag: props.dataset.etag || '',
      emailAddress: props.dataset.emailAddress || '',
      name: props.dataset.name || '',
      // NB: Set all roles directly on the state
      ...(props.dataset.roles || [])
        .map(role => role.title)
        .reduce((prev, curr) => ({
          ...prev,
          [curr]: true
        }), {})
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!Object.keys(nextProps.dataset).length) {
      return;
    }

    this.setState({
      etag: nextProps.dataset.etag,
      emailAddress: nextProps.dataset.emailAddress,
      name: nextProps.dataset.name,
      // NB: Set all roles directly on the state
      ...(nextProps.dataset.roles || [])
        .map(role => role.title)
        .reduce((prev, curr) => ({
          ...prev,
          [curr]: true
        }), {})
    });
  }

  handleChange(event, result) {
    this.setState({
      // NB: `result.*` is Semantic UI's approach for cross-browser support
      [result.name]: result.value || result.checked
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const dataset = {
      etag: this.state.etag,
      emailAddress: this.state.emailAddress,
      name: this.state.name,
      // NB: Reverse mapping of roles directly to the state
      roles: this.props.roles.reduce((prev, curr) => (this.state[curr.title] ?
        prev.concat(curr) : prev), [])
    };

    if (this.props.onCreate) {
      this.props.onCreate(dataset);
    }

    if (this.props.onUpdate) {
      this.props.onUpdate(dataset);
    }
  }

  render() {
    return (
      <span>
        <Form
          className="dcatd-form dataset-form"
          schema={schema}
          widgets={widgets}
          fields={fields}
          uiSchema={uiSchema}
          formData={formDatas}
          noHtml5Validate
          showErrorList={false}
          onChange={({ formData }) => console.log('CHANGE', formData)}
        />
      </span>
    );
  }
}

DatasetDetail.defaultProps = {
  dataset: {},
  onCreate: () => {},
  onUpdate: () => {},
  roles: []
};

DatasetDetail.propTypes = {
  dataset: PropTypes.shape({
    etag: PropTypes.string,
    emailAddress: PropTypes.string,
    name: PropTypes.string,
    roles: PropTypes.array
  }),
  onCreate: PropTypes.func,
  onUpdate: PropTypes.func,
  roles: PropTypes.arrayOf(PropTypes.object)
};

export default DatasetDetail;
