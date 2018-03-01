import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-jsonschema-form';
import extraFields from 'react-jsonschema-form-extras';

import uiDataset from '../definitions/uiDataset';
// import formDatas from '../definitions/dcatData';

import localFields from '../fields';
import widgets from '../widgets';

import '../../node_modules/react-day-picker/lib/style.css';
import './dcatd-form.scss';

const fields = {
  ...extraFields,
  ...localFields
};

// const resourceSchema = schema.properties['dcat:distribution'].items;

// use the order defined in the schema
// uiSchema['ui:order'] = resourceSchema['x-order'] || [];

const DatasetDetail = ({ schema }) => (
  <Form
    className="dcatd-form dataset-form"
    schema={schema}
    widgets={widgets}
    fields={fields}
    uiSchema={uiDataset}
    noHtml5Validate
    showErrorList={false}
    onChange={({ formData }) => console.log('CHANGE', formData)}
  />
);

DatasetDetail.propTypes = {
  schema: PropTypes.object.isRequired // eslint-disable-line
};

export default DatasetDetail;
