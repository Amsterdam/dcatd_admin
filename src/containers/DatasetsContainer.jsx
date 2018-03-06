import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { createDataset, removeDataset, updateDataset } from '../actions/dataset';
import DatasetList from '../components/DatasetList';
import DatasetDetail from '../components/DatasetDetail';

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
          onRemove={props.onRemove}
        />
      )}
    />
    <Route
      exact
      path="/dcatd_admin/datasets/:id([\w-]+)"
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
