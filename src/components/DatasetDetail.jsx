import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'react-jsonschema-form';
import extraFields from 'react-jsonschema-form-extras';

import schema from '../definitions/json-schema.json';
import uiSchema from '../definitions/uiDataset';
import formDatas from '../definitions/dcatData';

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

const DatasetDetail = () => (
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
);

DatasetDetail.propTypes = {
  schema: PropTypes.object.isRequired // eslint-disable-line
};

function mapStateToProps(state) {
  return {
    schema: state.schema,
    uiDataset: state.uiDataset
  };
}

export default connect(mapStateToProps)(DatasetDetail);
