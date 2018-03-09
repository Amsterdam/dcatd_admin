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
  constructor(props) {
    super(props);

    this.state = {
      uiResource: props.uiResource,
      formData: props.formData
    };

    this.setVisibilityOfFields = this.setVisibilityOfFields.bind(this);
  }

  componentDidMount() {
    if (this.hasDataset()) {
      // this.props.fetchDataset(this.props.id);
    }
  }

  setVisibilityOfFields(event) {
    if (event.formData['ams:distributionType'] === 'file') {
      this.showField('dct:format', 'select');
    } else {
      this.hideField('dct:format');
    }

    if (event.formData['ams:distributionType'] === 'api') {
      this.showField('ams:serviceType', 'select');
    } else {
      this.hideField('ams:serviceType');
    }

    this.setState({
      formData: {
        ...event.formData
      }
    });
  }

  showField(name, type = 'text') {
    this.setState({
      uiResource: {
        ...this.state.uiResource,
        [name]: {
          'ui:widget': type
        }
      }
    });
  }

  hideField(name) {
    this.setState({
      uiResource: {
        ...this.state.uiResource,
        [name]: {
          'ui:widget': 'hidden'
        }
      }
    });
  }

  hasDataset() {
    return this.props.id && this.props.id !== 'new';
  }

  render() {
    const { formData } = this.state;
    return (
      <div>
        <Form
          className="dcatd-form resource-form"
          schema={this.props.schema}
          formData={formData}
          widgets={widgets}
          fields={fields}
          uiSchema={this.state.uiResource}
          noHtml5Validate
          showErrorList={false}
          onChange={event => this.setVisibilityOfFields(event)}
        />
      </div>
    );
  }
}

ResourceDetail.defaultProps = {
  formData: {},
  id: null
};

ResourceDetail.propTypes = {
  formData: PropTypes.object,
  schema: PropTypes.object.isRequired,
  // uiDataset: PropTypes.object.isRequired,
  uiResource: PropTypes.object.isRequired,
  id: PropTypes.string
  // dataset: PropTypes.object.isRequired

  // fetchDataset: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ResourceDetail);
