import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchDataset, emptyDataset, createDataset, removeDataset, updateDataset }
  from '../actions/dataset';
import { emptyResource } from '../actions/resource';
import DatasetList from '../components/DatasetList';
import DatasetDetail from '../components/DatasetDetail/DatasetDetail';
import ResourceDetail from '../components/ResourceDetail/ResourceDetail';

import './datasets-container.scss';

const mapStateToProps = state => ({
  datasets: state.datasets,
  resource: state.resource,
  schema: state.schema,
  uiDataset: state.uiDataset,
  uiResource: state.uiResource
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onFetch: fetchDataset,
  onEmpty: emptyDataset,
  onCreate: createDataset,
  onRemove: removeDataset,
  onUpdate: updateDataset,
  onEmptyResource: emptyResource
}, dispatch);

class DatasetsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resourceToDataset: props.resourceToDataset
    };

    this.handleResourceToDataset = this.handleResourceToDataset.bind(this);
    this.emptyResourceToDataset = this.emptyResourceToDataset.bind(this);
  }

  handleResourceToDataset(resource) {
    this.setState({
      resourceToDataset: resource
    });
  }

  emptyResourceToDataset() {
    this.setState({
      resourceToDataset: {}
    });
  }

  render() {
    return (
      <section>
        <Route
          exact
          path="/dcatd_admin/datasets"
          render={() => (
            <DatasetList
              datasets={this.props.datasets}
            />
          )}
        />
        <Route
          exact
          path="/dcatd_admin/datasets/:id([\w-]{6,})"
          render={() => (
            <div
              className={`form-wrapper
                form-wrapper--${this.props.resource['dcat:accessURL'] ? 'show' : 'hide'}-resource-form`}
            >
              <ResourceDetail
                schema={(this.props.schema && this.props.schema.properties &&
                  this.props.schema.properties['dcat:distribution'] &&
                  this.props.schema.properties['dcat:distribution'].items) || {}}
                uiResource={this.props.uiResource}
                formData={this.props.resource}
                handleResourceToDataset={this.handleResourceToDataset}
                onEmptyResource={this.props.onEmptyResource}
              />
              <DatasetDetail
                id={this.props.match.params.id}
                schema={this.props.schema}
                resourceToDataset={this.state.resourceToDataset}
                uiDataset={this.props.uiDataset}
                uiResource={this.props.uiResource}
                onFetch={this.props.onFetch}
                onEmpty={this.props.onEmpty}
                onUpdate={this.props.onUpdate}
                onRemove={this.props.onRemove}
                emptyResourceToDataset={this.emptyResourceToDataset}
              />
            </div>
          )}
        />
        <Route
          exact
          path="/dcatd_admin/datasets/new"
          render={() => (
            <DatasetDetail
              schema={this.props.schema}
              uiDataset={this.props.uiDataset}
              uiResource={this.props.uiResource}
              onCreate={this.props.onCreate}
            />
          )}
        />
        <Route
          exact
          path="/dcatd_admin/resources/new"
          render={() => (
            <ResourceDetail
              schema={(this.props.schema && this.props.schema.properties &&
                this.props.schema.properties['dcat:distribution'] &&
                this.props.schema.properties['dcat:distribution'].items) || {}}
              uiDataset={this.props.uiDataset}
              uiResource={this.props.uiResource}
              onCreate={this.props.onCreate}
            />
          )}
        />
      </section>
    );
  }
}

DatasetsContainer.defaultProps = {
  dataset: {},
  datasets: [],
  resource: {},
  match: null,
  resourceToDataset: {},

  onFetch: () => {}
};

DatasetsContainer.propTypes = {
  match: PropTypes.object,
  datasets: PropTypes.arrayOf(PropTypes.object),
  resource: PropTypes.object,
  resourceToDataset: PropTypes.object,
  onFetch: PropTypes.func.isRequired,
  onEmpty: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onEmptyResource: PropTypes.func.isRequired,
  schema: PropTypes.object.isRequired,
  uiDataset: PropTypes.object.isRequired,
  uiResource: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatasetsContainer);
