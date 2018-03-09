import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { createDataset, removeDataset, updateDataset } from '../actions/dataset';
import DatasetList from '../components/DatasetList';
import DatasetDetail from '../components/DatasetDetail';
import ResourceDetail from '../components/ResourceDetail';

const mapStateToProps = state => ({
  datasets: state.datasets,
  schema: state.schema,
  uiDataset: state.uiDataset,
  uiResource: state.uiResource
});

const mapDispatchToProps = dispatch => bindActionCreators({
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
      path="/dcatd_admin/datasets/:id([a-zA-Z\d-]+)"
      render={() => (
        <DatasetDetail
          id={props.match.params.id}
          schema={props.schema}
          uiDataset={props.uiDataset}
          uiResource={props.uiResource}
          onUpdate={props.onUpdate}
        />
      )}
    />
    <Route
      exact
      path="/dcatd_admin/datasets/_new_"
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
      path="/dcatd_admin/resources/_new_"
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
  match: null
};

DatasetsContainer.propTypes = {
  match: PropTypes.object,
  datasets: PropTypes.arrayOf(PropTypes.object),
  onCreate: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  schema: PropTypes.object.isRequired,
  uiDataset: PropTypes.object.isRequired,
  uiResource: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatasetsContainer);
