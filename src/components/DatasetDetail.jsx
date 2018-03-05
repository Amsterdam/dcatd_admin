import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Form from 'react-jsonschema-form';
import extraFields from 'react-jsonschema-form-extras';

import { fetchDataset } from '../actions/dataset';
import localFields from '../fields';
import widgets from '../widgets';

import '../../node_modules/react-day-picker/lib/style.css';
import './dcatd-form.scss';

const fields = {
  ...extraFields,
  ...localFields
};

const mapStateToProps = state => ({
  dataset: state.dataset
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchDataset
}, dispatch);

class DatasetDetail extends Component {
  componentDidMount() {
    this.props.fetchDataset(this.props.id);
  }

  render() {
    const resourceSchema = (this.props.schema && this.props.schema.properties &&
      this.props.schema.properties['dcat:distribution'] &&
      this.props.schema.properties['dcat:distribution'].items) || {};

    return (
      <div>
        <Form
          className="dcatd-form dataset-form"
          schema={this.props.schema}
          widgets={widgets}
          fields={fields}
          uiSchema={this.props.uiDataset}
          noHtml5Validate
          showErrorList={false}
          onChange={({ formData }) => console.log('CHANGE', formData)}
        />
        <Form
          className="dcatd-form resource-form"
          schema={resourceSchema}
          widgets={widgets}
          fields={fields}
          uiSchema={this.props.uiResource}
          noHtml5Validate
          showErrorList={false}
          onChange={({ formData }) => console.log('CHANGE', formData)}
        />
      </div>
    );
  }
}

DatasetDetail.propTypes = {
  schema: PropTypes.object.isRequired, // eslint-disable-line
  uiDataset: PropTypes.object.isRequired, // eslint-disable-line
  uiResource: PropTypes.object.isRequired, // eslint-disable-line
  id: PropTypes.string, // eslint-disable-line

  fetchDataset: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DatasetDetail);
