import React from 'react';
import Form from 'react-jsonschema-form';

import schema from './json-schema.json';
import uiSchema from './uiSchema';
import formData from './dcatData';

import fields from '../../fields';
import widgets from '../../widgets';

import '../dcatd-form.scss';

// use the order defined in the schema
uiSchema['ui:order'] = schema['x-order'] || [];

const DatasetForm = () => (
  <Form
    className="dcatd-form dataset-form"
    schema={schema}
    widgets={widgets}
    fields={fields}
    uiSchema={uiSchema}
    formData={formData}
  />
);

export default DatasetForm;
