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

class ResourceDetail extends Component {
  componentDidMount() {
    if (this.hasDataset()) {
      this.props.fetchDataset(this.props.id);
    }
  }

  hasDataset() {
    return this.props.id && this.props.id !== 'new';
  }

  render() {
    const resourceSchema = (this.props.schema && this.props.schema.properties &&
      this.props.schema.properties['dcat:distribution'] &&
      this.props.schema.properties['dcat:distribution'].items) || {};

    return (
      <div>
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

/*
*/

ResourceDetail.defaultProps = {
  id: null
};

ResourceDetail.propTypes = {
  schema: PropTypes.object.isRequired,
  // uiDataset: PropTypes.object.isRequired,
  uiResource: PropTypes.object.isRequired,
  id: PropTypes.string,
  // dataset: PropTypes.object.isRequired,

  fetchDataset: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ResourceDetail);
