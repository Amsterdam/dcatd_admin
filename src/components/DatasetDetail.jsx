import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal } from 'semantic-ui-react';

import Form from 'react-jsonschema-form';
import extraFields from 'react-jsonschema-form-extras';

import { fetchDataset, emptyDataset, createDataset, removeDataset } from '../actions/dataset';
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
  fetchDataset,
  emptyDataset,
  createDataset,
  removeDataset
}, dispatch);

class DatasetDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataset: props.dataset,
      isModalOpen: props.isModalOpen
    };
  }

  componentDidMount() {
    if (this.props.id) {
      this.props.fetchDataset(this.props.id);
    } else {
      this.props.emptyDataset();
    }
  }

  componentWillReceiveProps(props) {
    if (props.dataset) {
      this.setState({
        dataset: { ...props.dataset }
      });
    }
  }

  render() {
    const { dataset } = this.state;
    return (
      <div>
        <Form
          className="dcatd-form dataset-form"
          schema={this.props.schema}
          formData={dataset}
          widgets={widgets}
          fields={fields}
          uiSchema={this.props.uiDataset}
          noHtml5Validate
          showErrorList={false}
          onSubmit={event => this.props.createDataset(event.formData)}
          onChange={event => console.log('CHANGE', event.formData)}
        >
          <div>
            <button
              className="dcatd-form-button dcatd-form-button-submit"
              type="submit"
            >
              Opslaan</button>
            <button
              className="dcatd-form-button dcatd-form-button-cancel"
              type="button"
            >
              Annuleren</button>
            <Modal
              open={this.state.isModalOpen}
              trigger={(
                <button
                  onClick={() => this.setState({
                    isModalOpen: true
                  })}
                  type="button"
                  className="dcatd-form-button dcatd-form-button-remove"
                >
                  Dataset verwijderen
                </button>
              )}
              size="tiny"
            >
              <Modal.Content>
                <h4>Let op!</h4>
                <p>Door de dataset te verwijderen, gaan alle gegevens verloren.</p>
              </Modal.Content>
              <Modal.Actions>
                <button
                  onClick={() => {
                    this.setState({
                      isModalOpen: false
                    });
                    this.props.removeDataset(dataset);
                  }}
                  className="dcatd-form-button dcatd-form-button-submit"
                >
                  Dataset verwijderen
                </button>
                <button
                  onClick={() => this.setState({
                    isModalOpen: false
                  })}
                  className="dcatd-form-button"
                >
                  Annuleren
                </button>
              </Modal.Actions>
            </Modal>

          </div>
        </Form>
      </div>
    );
  }
}

DatasetDetail.defaultProps = {
  id: null,
  isModalOpen: false,
  dataset: {}
};

DatasetDetail.propTypes = {
  schema: PropTypes.object.isRequired,
  uiDataset: PropTypes.object.isRequired,
  id: PropTypes.string,
  isModalOpen: PropTypes.bool,
  dataset: PropTypes.object,

  fetchDataset: PropTypes.func.isRequired,
  emptyDataset: PropTypes.func.isRequired,
  createDataset: PropTypes.func.isRequired,
  removeDataset: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DatasetDetail);
