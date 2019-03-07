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
      schema: props.schema,
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
      formData: { ...props.formData },
      schema: { ...props.schema }
    });

    defer(() => {
      this.setVisibilityOfFields(this.state.formData);

      this.setState((state) => {
        return {
          formData: { ...state.formData },
          schema: { ...props.schema }
        };
      });
    });
  }

  setUploadStatus(partialState) {
    this.setState(partialState);
  }

  setVisibilityOfFields(formData) {
    if (formData['ams:distributionType'] === 'file') {
      this.setFieldState('dcat:mediaType', 'select');
      this.setFieldRequired('dcat:mediaType');
    } else {
      this.setFieldState('dcat:mediaType', 'hidden');
    }

    if (formData['ams:distributionType'] !== 'file') {
      this.setFieldState('dcat:byteSize', 'hidden');
    } else {
      this.setFieldState('dcat:byteSize', 'string');
    }

    if (formData['ams:distributionType'] === 'api') {
      this.setFieldState('ams:serviceType', 'select');
      this.setFieldRequired('ams:serviceType');
    } else {
      this.setFieldState('ams:serviceType', 'hidden');
    }
  }

  setFieldState(name, value) {
    this.setState((state) => {
      return {
        uiResource: {
          ...state.uiResource,
          [name]: {
            ...state.uiResource[name],
            'ui:widget': value
          }
        }
      };
    });
  }

  setFieldRequired(property) {
    this.setState((state, props) => {
      return {
        schema: {
          ...state.schema,
          required: [...props.schema.required, property]
        }
      };
    });
  }

  setResourceSpecs(values) {
    this.setState((state) => {
      return {
        formData: {
          ...state.formData,
          ...values
        }
      };
    });

    this.setUploadStatus({
      uploadStatus: 'done'
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

  handleEmptyResource() {
    this.setState({ formId: `id${Date.now()}` }, () => this.props.onEmptyResource());
  }

  handleSubmit(event) {
    this.props.onSetResourceToDataset(event.formData);
    this.handleEmptyResource();
  }

  handleCancel() {
    if (this.state.uploadStatus === 'busy') {
      this.props.setModal({
        actionLabel: 'Uploaden afbreken',
        cancelLabel: 'Op deze pagina blijven',
        content: 'Het uploaden is nog niet voltooid.',
        open: true,
        onProceed: () => {
          this.handleEmptyResource();
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
            this.handleEmptyResource();
          }
        });
      } else {
        this.handleEmptyResource();
      }
    }
  }

  render() {
    const { formData, formId, schema, uiResource } = this.state;
    const widgets = {
      file: (props) => { return <File {...props} />; },
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
          id={formId}
          idPrefix="resource"
          schema={schema}
          key={formId}
          formData={formData}
          formContext={{
            setResourceSpecs: this.setResourceSpecs,
            setUploadStatus: this.setUploadStatus
          }}
          widgets={widgets}
          fields={fields}
          uiSchema={uiResource}
          noHtml5Validate
          showErrorList={false}
          transformErrors={transformErrors}
          onError={scrollToError}
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
        >
          <div className="dcatd-form-footer">
            <div className="dcatd-form-footer__container">
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
