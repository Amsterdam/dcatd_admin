import React from 'react';
import Form from 'react-jsonschema-form';
import extraFields from 'react-jsonschema-form-extras';

import schema from './json-schema.json';
import uiSchema from './uiSchema';
import formDatas from './dcatData';

import localFields from '../../fields';
import widgets from '../../widgets';

import '../dcatd-form.scss';

const fields = {
  ...extraFields,
  ...localFields
};

// use the order defined in the schema
uiSchema['ui:order'] = schema['x-order'] || [];

const DatasetForm = () => (
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

export default DatasetForm;
