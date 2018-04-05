import React, { Component } from 'react';
import PropTypes from 'prop-types';
import defer from 'lodash.defer';

import Form from 'react-jsonschema-form';
import extraFields from 'react-jsonschema-form-extras';

import Modal from '../Modal/Modal';
import transformErrors from '../../services/transform-errors/transform-errors';
import scrollToError from '../../services/scroll-to-error/scroll-to-error';
import localFields from '../../fields';
import widgets from '../../widgets';

import '../../../node_modules/react-day-picker/lib/style.css';
import '../dcatd-form.scss';

const fields = {
  ...extraFields,
  ...localFields
};

class ResourceDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uiResource: props.uiResource,
      formData: props.formData
    };

    this.setVisibilityOfFields = this.setVisibilityOfFields.bind(this);
    this.setFieldState = this.setFieldState.bind(this);
    this.setResourceSpecs = this.setResourceSpecs.bind(this);
    this.hasResource = this.hasResource.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      uiResource: { ...props.uiResource },
      formData: { ...props.formData }
    });

    defer(() => {
      this.setVisibilityOfFields(this.state.formData);
    });
  }

  setVisibilityOfFields(formData) {
    if (formData['ams:distributionType'] === 'file') {
      this.setFieldState('dct:format', 'select');
    } else {
      this.setFieldState('dct:format', 'hidden');
    }

    if (formData['ams:distributionType'] === 'api') {
      this.setFieldState('ams:serviceType', 'select');
    } else {
      this.setFieldState('ams:serviceType', 'hidden');
    }

    this.setState({
      formData: {
        ...formData
      }
    });
  }

  setFieldState(name, value) {
    this.setState({
      uiResource: {
        ...this.state.uiResource,
        [name]: {
          ...this.state.uiResource[name],
          'ui:widget': value
        }
      }
    });
  }

  setResourceSpecs(values) {
    this.setState({
      formData: {
        ...this.state.formData,
        ...values
      }

    });
  }

  hasResource() {
    return this.props.formData['@id'];
  }

  handleSubmit(formData) {
    this.props.handleResourceToDataset(formData);
    this.props.onEmptyResource();
  }

  handleCancel() {
    this.props.onEmptyResource();
  }

  render() {
    const { formData } = this.state;
    return (
      <div>
        <Form
          className="dcatd-form resource-form"
          idPrefix="resource"
          schema={this.props.schema}
          formData={formData}
          formContext={{
            setResourceSpecs: this.setResourceSpecs
          }}
          widgets={widgets}
          fields={fields}
          uiSchema={this.state.uiResource}
          noHtml5Validate
          showErrorList={false}
          transformErrors={transformErrors}
          onError={scrollToError}
          onSubmit={event => this.handleSubmit(event.formData)}
          onChange={event => this.setVisibilityOfFields(event.formData)}
        >
          <div>
            <button
              className="dcatd-form-button dcatd-form-button-submit"
              type="submit"
            >
              Opslaan</button>
            <button
              onClick={() => this.props.onEmptyResource()}
              className="dcatd-form-button dcatd-form-button-cancel"
              type="button"
            >
              Annuleren</button>
            {this.hasResource() ?
              <Modal
                ref={(ref) => { this.modal = ref; }}
                content="Door de resource te verwijderen, gaan alle gegevens verloren."
                actionLabel="Resource verwijderen"
                trigger={(
                  <button
                    onClick={() => this.modal.handleShowState(true)}
                    type="button"
                    className="dcatd-form-button dcatd-form-button-remove"
                  >
                    Resource verwijderen
                  </button>
                )}
                onProceed={() => {
                  this.handleSubmit({
                    '@id': formData['@id'],
                    'dcat:accessURL': 'remove'
                  });
                }}
              />
              : ''}
          </div>
        </Form>
      </div>
    );
  }
}

ResourceDetail.defaultProps = {
  formData: {}
};

ResourceDetail.propTypes = {
  formData: PropTypes.object,
  schema: PropTypes.object.isRequired,
  uiResource: PropTypes.object.isRequired,

  handleResourceToDataset: PropTypes.func.isRequired,
  onEmptyResource: PropTypes.func.isRequired
};

export default ResourceDetail;
