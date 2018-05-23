import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchDataset, emptyDataset, createDataset, cancelDataset, removeDataset, updateDataset }
  from '../../actions/dataset/dataset';
import { setResourceToDataset } from '../../actions/resourceToDataset/resourceToDataset';
import { emptyResource, setResource } from '../../actions/resource/resource';
import { setModal } from '../../actions/modal/modal';

import DatasetList from '../../components/DatasetList/DatasetList';
import DatasetForm from '../../containers/DatasetForm/DatasetForm';
import ResourceForm from '../../containers/ResourceForm/ResourceForm';

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
  onCancel: cancelDataset,
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
      path="/datasets"
      render={() => (
        <DatasetList
          datasets={props.datasets}
        />
      )}
    />
    <Route
      exact
      path="/datasets/:id([\w-]{2,})"
      render={() => (
        <div
          className={`form-wrapper
            form-wrapper--${props.resource['ams:resourceType'] ? 'show' : 'hide'}-resource-form`}
        >
          <ResourceForm
            schema={(props.schema && props.schema.properties &&
              props.schema.properties['dcat:distribution'] &&
              props.schema.properties['dcat:distribution'].items) || {}}
            uiResource={props.uiResource}
            formData={props.resource}
            onSetResourceToDataset={props.onSetResourceToDataset}
            onEmptyResource={props.onEmptyResource}
            setModal={props.onSetModal}
            datasetTitle={props.dataset['dct:title']}
          />
          <DatasetForm
            id={props.match.params.id}
            dataset={props.dataset}
            schema={props.schema}
            resourceToDataset={props.resourceToDataset}
            uiDataset={props.uiDataset}
            onFetch={props.onFetch}
            onEmpty={props.onEmpty}
            onUpdate={props.onUpdate}
            onCancel={props.onCancel}
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
      path="/datasets/_"
      render={() => (
        <div
          className={`form-wrapper
            form-wrapper--${props.resource['ams:resourceType'] ? 'show' : 'hide'}-resource-form`}
        >
          <ResourceForm
            schema={(props.schema && props.schema.properties &&
              props.schema.properties['dcat:distribution'] &&
              props.schema.properties['dcat:distribution'].items) || {}}
            uiResource={props.uiResource}
            formData={props.resource}
            onSetResourceToDataset={props.onSetResourceToDataset}
            onEmptyResource={props.onEmptyResource}
            setModal={props.onSetModal}
          />
          <DatasetForm
            schema={props.schema}
            resourceToDataset={props.resourceToDataset}
            uiDataset={props.uiDataset}
            onCreate={props.onCreate}
            onCancel={props.onCancel}
            onEmpty={props.onEmpty}
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
  schema: {},
  match: null,
  resourceToDataset: {},
  uiDataset: {},
  uiResource: {},

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
  onCancel: PropTypes.func.isRequired,
  onEmptyResource: PropTypes.func.isRequired,
  onSetResource: PropTypes.func.isRequired,
  onSetModal: PropTypes.func.isRequired,
  onSetResourceToDataset: PropTypes.func.isRequired,

  schema: PropTypes.object,
  uiDataset: PropTypes.object,
  uiResource: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatasetsContainer);
