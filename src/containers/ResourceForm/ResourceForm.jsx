import React, { Component } from 'react';
import PropTypes from 'prop-types';
import defer from 'lodash.defer';

import Form from 'react-jsonschema-form';
import extraFields from 'react-jsonschema-form-extras';

import transformErrors from '../../services/transform-errors/transform-errors';
import scrollToError from '../../services/scroll-to-error/scroll-to-error';
import isEqual from '../../services/is-equal/is-equal';
import localFields from '../../fields';

import '../../../node_modules/react-day-picker/lib/style.css';
import '../dcatd-form.scss';
import './resource-detail.scss';


import File from '../../widgets/File/File';
import Markdown from '../../widgets/Markdown/Markdown';

const fields = {
  ...extraFields,
  ...localFields
};

class ResourceForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uiResource: props.uiResource,
      formData: props.formData,
      formId: `id${Date.now()}`,
      uploadStatus: props.uploadStatus
    };

    this.setFieldState = this.setFieldState.bind(this);
    this.setResourceSpecs = this.setResourceSpecs.bind(this);
    this.setUploadStatus = this.setUploadStatus.bind(this);
    this.hasResource = this.hasResource.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      uiResource: { ...props.uiResource },
      formData: { ...props.formData }
    });

    defer(() => {
      this.setVisibilityOfFields(this.state.formData);

      this.setState({
        formData: {
          ...this.state.formData
        }
      });
    });
  }

  setVisibilityOfFields(formData) {
    if (formData['ams:distributionType'] === 'file') {
      this.setFieldState('dct:format', 'select');
    } else {
      this.setFieldState('dct:format', 'hidden');
    }

    if (formData['ams:distributionType'] !== 'file') {
      this.setFieldState('dcat:byteSize', 'hidden');
    } else {
      this.setFieldState('dcat:byteSize', 'string');
    }

    if (formData['ams:distributionType'] === 'api') {
      this.setFieldState('ams:serviceType', 'select');
    } else {
      this.setFieldState('ams:serviceType', 'hidden');
    }
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

    this.setUploadStatus('done');
  }

  setUploadStatus(status) {
    this.setState({
      uploadStatus: status
    });
  }

  handleChange(event) {
    this.setState({
      formData: event.formData
    });

    this.setVisibilityOfFields(event.formData);
  }

  hasResource() {
    return this.props.formData['@id'];
  }

  handleSubmit(event) {
    this.props.onSetResourceToDataset(event.formData);
    this.props.onEmptyResource();
  }

  handleCancel() {
    if (this.state.uploadStatus === 'busy') {
      this.props.setModal({
        actionLabel: 'Uploaden afbreken',
        cancelLabel: 'Op deze pagina blijven',
        content: 'Het uploaden is nog niet voltooid.',
        open: true,
        onProceed: () => {
          this.props.onEmptyResource();
        }
      });
    } else {
      const equal = isEqual(this.state.formData, this.props.formData, ['dct:modified', 'foaf:isPrimaryTopicOf']);
      if (!equal) {
        this.props.setModal({
          actionLabel: 'De gemaakte wijzigingen negeren',
          cancelLabel: 'Blijf deze resource bewerken',
          content: 'Wijzigingen van deze resource zijn nog niet opgeslagen',
          open: true,
          onProceed: () => {
            this.props.onEmptyResource();
          }
        });
      } else {
        this.props.onEmptyResource();
      }
    }
    this.setState({ formId: `id${Date.now()}` });
  }

  render() {
    const { formData, formId } = this.state;
    const widgets = {
      file: (props) => { return <File {...props} purl={formData['ams:purl']} />; },
      markdown: Markdown
    };
    return (
      <div>
        <button
          onClick={this.handleCancel}
          className="resource-form__back"
        >{this.props.datasetTitle}</button>
        <h1 className="resource-title">Resource {this.hasResource() ? 'wijzigen' : 'toevoegen'}</h1>
        <Form
          className="dcatd-form resource-form"
          idPrefix="resource"
          key={formId}
          schema={this.props.schema}
          formData={formData}
          formContext={{
            setResourceSpecs: this.setResourceSpecs,
            setUploadStatus: this.setUploadStatus
          }}
          widgets={widgets}
          fields={fields}
          uiSchema={this.state.uiResource}
          noHtml5Validate
          showErrorList={false}
          transformErrors={transformErrors}
          onError={scrollToError}
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
        >
          <div>
            <button
              className="dcatd-form-button dcatd-form-button-submit"
              type="submit"
            >
              OK en terug</button>
            <button
              onClick={this.handleCancel}
              className="dcatd-form-button dcatd-form-button-cancel"
              type="button"
            >
              Annuleren</button>
            {this.hasResource() ?
              <button
                onClick={() => this.props.setModal({
                  actionLabel: 'Resource verwijderen',
                  cancelLabel: 'Annuleren',
                  content: 'Door de resource te verwijderen, gaan alle gegevens van de resource verloren',
                  open: true,
                  onProceed: () => {
                    this.handleSubmit({
                      formData: {
                        '@id': formData['@id'],
                        'dcat:accessURL': 'remove'
                      }
                    });
                  }
                })}
                type="button"
                className="dcatd-form-button dcatd-form-button-remove"
              >
                Resource verwijderen
              </button>
              : ''}
            <div className="resource-form__disclaimer">
              Let op: na het klikken op OK is de resource nog niet opgeslagen. Pas tijdens het
              opslaan van de dataset wordt ook de resource opgeslagen.
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

ResourceForm.defaultProps = {
  formData: {},
  datasetTitle: 'Ga terug naar dataset',
  uploadStatus: 'idle'
};

ResourceForm.propTypes = {
  formData: PropTypes.object,
  schema: PropTypes.object.isRequired,
  uiResource: PropTypes.object.isRequired,
  uploadStatus: PropTypes.string,
  datasetTitle: PropTypes.string,

  onSetResourceToDataset: PropTypes.func.isRequired,
  onEmptyResource: PropTypes.func.isRequired,
  setModal: PropTypes.func.isRequired
};

export default ResourceForm;
