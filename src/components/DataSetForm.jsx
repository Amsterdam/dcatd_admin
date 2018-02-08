import React from 'react';
import Form from 'react-jsonschema-form';

import schema from './schema';
import uiSchema from './uiSchema';

const onSubmit = ({ formData }) => console.log('Data submitted: ', formData);
const onError = errors => console.log('I have', errors.length, 'errors to fix');

const DataSetForm = () => (
  <Form
    schema={schema}
    uiSchema={uiSchema}
    onChange={console.log('changed')}
    onSubmit={onSubmit}
    onError={onError}
  />
);

export default DataSetForm;
