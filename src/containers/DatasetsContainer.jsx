import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchDataset, emptyDataset, createDataset, removeDataset, updateDataset }
  from '../actions/dataset';
import DatasetList from '../components/DatasetList';
import DatasetDetail from '../components/DatasetDetail/DatasetDetail';
import ResourceDetail from '../components/ResourceDetail/ResourceDetail';

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
  onUpdate: updateDataset
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
        <div>
          <ResourceDetail
            schema={(props.schema && props.schema.properties &&
              props.schema.properties['dcat:distribution'] &&
              props.schema.properties['dcat:distribution'].items) || {}}
            uiResource={props.uiResource}
            formData={props.resource}
          />
          <DatasetDetail
            id={props.match.params.id}
            schema={props.schema}
            uiDataset={props.uiDataset}
            uiResource={props.uiResource}
            onFetch={props.onFetch}
            onEmpty={props.onEmpty}
            onUpdate={props.onUpdate}
            onRemove={props.onRemove}
          />
        </div>
      )}
    />
    <Route
      exact
      path="/dcatd_admin/datasets/new"
      render={() => (
        <DatasetDetail
          schema={props.schema}
          uiDataset={props.uiDataset}
          uiResource={props.uiResource}
          onCreate={props.onCreate}
        />
      )}
    />
    <Route
      exact
      path="/dcatd_admin/resources/new"
      render={() => (
        <ResourceDetail
          schema={(props.schema && props.schema.properties &&
            props.schema.properties['dcat:distribution'] &&
            props.schema.properties['dcat:distribution'].items) || {}}
          uiDataset={props.uiDataset}
          uiResource={props.uiResource}
          onCreate={props.onCreate}
        />
      )}
    />
  </section>
);

DatasetsContainer.defaultProps = {
  dataset: {},
  datasets: [],
  resource: {},
  match: null
};

DatasetsContainer.propTypes = {
  match: PropTypes.object,
  datasets: PropTypes.arrayOf(PropTypes.object),
  resource: PropTypes.object,
  onFetch: PropTypes.func.isRequired,
  onEmpty: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  schema: PropTypes.object.isRequired,
  uiDataset: PropTypes.object.isRequired,
  uiResource: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatasetsContainer);
