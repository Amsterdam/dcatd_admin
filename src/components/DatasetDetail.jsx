import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-jsonschema-form';
import extraFields from 'react-jsonschema-form-extras';

import localFields from '../fields';
import widgets from '../widgets';

import '../../node_modules/react-day-picker/lib/style.css';
import './dcatd-form.scss';

const fields = {
  ...extraFields,
  ...localFields
};

function DatasetDetail({ schema, uiDataset, uiResource }) {
  const resourceSchema = (schema && schema.properties && schema.properties['dcat:distribution'] && schema.properties['dcat:distribution'].items) || {};
  return (
    <div>
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
      <Form
        className="dcatd-form resource-form"
        schema={resourceSchema}
        widgets={widgets}
        fields={fields}
        uiSchema={uiResource}
        noHtml5Validate
        showErrorList={false}
        onChange={({ formData }) => console.log('CHANGE', formData)}
      />
    </div>
  );
}

DatasetDetail.propTypes = {
  schema: PropTypes.object.isRequired, // eslint-disable-line
  uiDataset: PropTypes.object.isRequired, // eslint-disable-line
  uiResource: PropTypes.object.isRequired // eslint-disable-line
};

export default DatasetDetail;
