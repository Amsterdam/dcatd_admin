import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Form from 'react-jsonschema-form';
import extraFields from 'react-jsonschema-form-extras';

import transformErrors from '../../services/transform-errors/transform-errors';
import scrollToError from '../../services/scroll-to-error/scroll-to-error';
import isEqual from '../../services/is-equal/is-equal';
import { isAdmin } from '../../services/auth/auth';
import localFields from '../../fields';
import widgets from '../../widgets';

import '../../../node_modules/react-day-picker/lib/style.css';
import '../dcatd-form.scss';
import './dataset-detail.scss';

const fields = {
  ...extraFields,
  ...localFields
};

const mapStateToProps = state => ({
  dataset: state.dataset
});

class DatasetForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataset: props.dataset
    };

    this.handleResourceToDataset = this.handleResourceToDataset.bind(this);
    this.hasDataset = this.hasDataset.bind(this);
    this.handleSetResource = this.handleSetResource.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    if (this.hasDataset()) {
      this.props.onFetch(this.props.id);
    } else {
      this.props.onEmpty();
    }
    this.props.onEmptyResource();
  }

  componentWillReceiveProps(props) {
    this.setState({
      dataset: { ...props.dataset }
    });

    if (props.resourceToDataset['dcat:accessURL']) {
      this.handleResourceToDataset(props.resourceToDataset);
    }
  }

  handleResourceToDataset(resource) {
    let distributions = [...this.state.dataset['dcat:distribution'] || []];
    const id = resource['@id'];

    if (id) {
      if (resource['dcat:accessURL'] === 'remove') {
        // remove resource
        distributions = distributions.filter(distribution => distribution['@id'] !== id);
      } else {
        distributions = distributions.map((distribution) => {
          if (distribution['@id'] === id) {
            return { ...resource };
          }
          return { ...distribution };
        });
      }
    } else {
      // create new resource
      resource['@id'] = `_:${Math.random().toString(36).substr(2, 10)}`;
      distributions.push(resource);
    }

    this.setState({
      dataset: {
        ...this.state.dataset,
        'dcat:distribution': [...distributions]
      }
    });
  }

  handleSetResource(resource) {
    this.props.onSetResource(resource);
  }

  hasDataset() {
    return this.props.id;
  }

  handleSubmit(event) {
    if (this.hasDataset()) {
      this.props.onUpdate(event.formData);
    } else {
      this.props.onCreate(event.formData);
    }
  }

  handleChange(event) {
    this.setState({
      dataset: event.formData
    });
  }

  handleCancel() {
    if (isEqual(this.state.dataset, this.props.dataset, ['@context'])) {
      this.props.onCancel();
    } else {
      this.props.setModal({
        actionLabel: 'De gemaakte wijzigingen negeren',
        cancelLabel: 'Blijf deze dataset bewerken',
        content: 'Wijzigingen op deze pagina zijn nog niet opgeslagen',
        open: true,
        onProceed: () => {
          this.props.onCancel();
        }
      });
    }
  }

  render() {
    const { dataset } = this.state;
    return (
      <div>
        <h1 className="dataset-title">Dataset {this.hasDataset() ? 'wijzigen' : 'toevoegen'}</h1>
        <Form
          className="dcatd-form dataset-form"
          idPrefix="dataset"
          schema={this.props.schema}
          formData={dataset}
          formContext={{
            handleSetResource: this.handleSetResource
          }}
          widgets={widgets}
          fields={fields}
          uiSchema={this.props.uiDataset}
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
              Opslaan</button>
            <button
              className="dcatd-form-button dcatd-form-button-cancel"
              onClick={this.handleCancel}
              type="button"
            >
              Annuleren</button>
            {(this.hasDataset() && isAdmin()) ?
              <button
                onClick={() => this.props.setModal({
                  actionLabel: 'Dataset verwijderen',
                  cancelLabel: 'Annuleren',
                  content: 'Door de dataset te verwijderen, gaan alle gegevens verloren',
                  open: true,
                  onProceed: () => {
                    this.props.onRemove(dataset);
                  }
                })}
                type="button"
                className="dcatd-form-button dcatd-form-button-remove"
              >
                Dataset verwijderen
              </button>
              : ''}
          </div>
        </Form>
      </div>
    );
  }
}

DatasetForm.defaultProps = {
  id: null,
  dataset: {},
  resourceToDataset: {},

  onFetch: () => { },
  onEmpty: () => { },
  onCreate: () => { },
  onCancel: () => { },
  onRemove: () => { },
  onUpdate: () => { },
  onEmptyResource: () => { },
  onSetResource: () => { },
  setModal: () => { }
};

DatasetForm.propTypes = {
  schema: PropTypes.object.isRequired,
  uiDataset: PropTypes.object.isRequired,
  id: PropTypes.string,
  dataset: PropTypes.object,
  resourceToDataset: PropTypes.object,

  onFetch: PropTypes.func,
  onEmpty: PropTypes.func,
  onCreate: PropTypes.func,
  onCancel: PropTypes.func,
  onRemove: PropTypes.func,
  onUpdate: PropTypes.func,
  onEmptyResource: PropTypes.func,
  onSetResource: PropTypes.func,
  setModal: PropTypes.func
};

export default connect(
  mapStateToProps,
  null // mapDispatchToProps
)(DatasetForm);
