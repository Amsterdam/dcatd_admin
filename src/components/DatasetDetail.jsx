import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Form from 'react-jsonschema-form';
import extraFields from 'react-jsonschema-form-extras';

import { fetchDataset, emptyDataset } from '../actions/dataset';
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
  emptyDataset
}, dispatch);

class DatasetDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataset: props.dataset
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
        dataset: props.dataset
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
          onChange={event => console.log('CHANGE', event.formData)}
        />
      </div>
    );
  }
}

DatasetDetail.defaultProps = {
  id: null,
  dataset: {}
};

DatasetDetail.propTypes = {
  schema: PropTypes.object.isRequired,
  uiDataset: PropTypes.object.isRequired,
  id: PropTypes.string,
  dataset: PropTypes.object,

  fetchDataset: PropTypes.func.isRequired,
  emptyDataset: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DatasetDetail);
