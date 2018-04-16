import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchDataset, emptyDataset, createDataset, removeDataset, updateDataset }
  from '../actions/dataset/dataset';
import { setResourceToDataset } from '../actions/resourceToDataset';
import { emptyResource, setResource } from '../actions/resource';
import { setModal } from '../actions/modal';

import DatasetList from '../components/DatasetList';
import DatasetDetail from '../components/DatasetDetail/DatasetDetail';
import ResourceDetail from '../components/ResourceDetail/ResourceDetail';

import './datasets-container.scss';

const mapStateToProps = state => ({
  dataset: state.dataset,
  datasets: state.datasets,
  resource: state.resource,
  resourceToDataset: state.resourceToDataset,
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
  onEmptyResource: emptyResource,
  onSetResource: setResource,
  onSetModal: setModal,
  onSetResourceToDataset: setResourceToDataset
}, dispatch);

const DatasetsContainer = props => (
  <section>
    <Route
      exact
      path="/dcatd_admin/datasets"
      render={() => (
        <DatasetList
          datasets={props.datasets}
        />
      )}
    />
    <Route
      exact
      path="/dcatd_admin/datasets/:id([\w-]{6,})"
      render={() => (
        <div
          className={`form-wrapper
            form-wrapper--${props.resource['ams:resourceType'] ? 'show' : 'hide'}-resource-form`}
        >
          <ResourceDetail
            schema={(props.schema && props.schema.properties &&
              props.schema.properties['dcat:distribution'] &&
              props.schema.properties['dcat:distribution'].items) || {}}
            uiResource={props.uiResource}
            formData={props.resource}
            onSetResourceToDataset={props.onSetResourceToDataset}
            onEmptyResource={props.onEmptyResource}
            setModal={props.onSetModal}
          />
          <DatasetDetail
            id={props.match.params.id}
            dataset={props.dataset}
            schema={props.schema}
            resourceToDataset={props.resourceToDataset}
            uiDataset={props.uiDataset}
            uiResource={props.uiResource}
            onFetch={props.onFetch}
            onEmpty={props.onEmpty}
            onUpdate={props.onUpdate}
            onRemove={props.onRemove}
            onEmptyResource={props.onEmptyResource}
            onSetResource={props.onSetResource}
            setModal={props.onSetModal}
          />
        </div>
      )}
    />
    <Route
      exact
      path="/dcatd_admin/datasets/new"
      render={() => (
        <div
          className={`form-wrapper
            form-wrapper--${props.resource['ams:resourceType'] ? 'show' : 'hide'}-resource-form`}
        >
          <ResourceDetail
            schema={(props.schema && props.schema.properties &&
              props.schema.properties['dcat:distribution'] &&
              props.schema.properties['dcat:distribution'].items) || {}}
            uiResource={props.uiResource}
            formData={props.resource}
            onSetResourceToDataset={props.onSetResourceToDataset}
            onEmptyResource={props.onEmptyResource}
            setModal={props.onSetModal}
          />
          <DatasetDetail
            schema={props.schema}
            resourceToDataset={props.resourceToDataset}
            uiDataset={props.uiDataset}
            uiResource={props.uiResource}
            onCreate={props.onCreate}
            onEmptyResource={props.onEmptyResource}
            onSetResource={props.onSetResource}
            setModal={props.onSetModal}
          />
        </div>
      )}
    />
  </section>
);

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
  dataset: PropTypes.object,
  datasets: PropTypes.arrayOf(PropTypes.object),
  resource: PropTypes.object,
  resourceToDataset: PropTypes.object,

  onFetch: PropTypes.func.isRequired,
  onEmpty: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onEmptyResource: PropTypes.func.isRequired,
  onSetResource: PropTypes.func.isRequired,
  onSetModal: PropTypes.func.isRequired,
  onSetResourceToDataset: PropTypes.func.isRequired,
  schema: PropTypes.object.isRequired,
  uiDataset: PropTypes.object.isRequired,
  uiResource: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatasetsContainer);
