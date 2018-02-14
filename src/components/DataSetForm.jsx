import React from 'react';
import Form from 'react-jsonschema-form';

import schema from './dcat.json';
import uiSchema from './uiSchema';
import fields from '../fields';
import widgets from '../widgets';

const DataSetForm = () => (
  <Form
    schema={schema}
    widgets={widgets}
    fields={fields}
    uiSchema={uiSchema}
  />
);

export default DataSetForm;
