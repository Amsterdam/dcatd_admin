import React, { Component } from 'react';
import PropTypes from 'prop-types';
import defer from 'lodash.defer';

import Form from 'react-jsonschema-form';
import extraFields from 'react-jsonschema-form-extras';

import Modal from '../Modal/Modal';
import transformErrors from '../../services/transform-errors/transform-errors';
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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.hasResource = this.hasResource.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      uiResource: { ...props.uiResource },
      formData: { ...props.formData }
    });

    defer(() => {
      this.setVisibilityOfFields(props.formData);
    });
  }

  setVisibilityOfFields(formData) {
    if (formData['ams:distributionType'] === 'file') {
      this.showField('dct:format', 'select');
    } else {
      this.hideField('dct:format');
    }

    if (formData['ams:distributionType'] === 'api') {
      this.showField('ams:serviceType', 'select');
    } else {
      this.hideField('ams:serviceType');
    }

    this.setState({
      formData: {
        ...formData
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
          widgets={widgets}
          fields={fields}
          uiSchema={this.state.uiResource}
          noHtml5Validate
          showErrorList={false}
          transformErrors={transformErrors}
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
                  console.log('proceed to remove resource');
                  // this.props.onRemove(dataset);
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
