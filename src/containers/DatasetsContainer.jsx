import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { createDataset, removeDataset, updateDataset } from '../actions/dataset';
import { getActiveDatasets, selectDataset } from '../reducers/datasets';
import DatasetList from '../components/DatasetList';
import DatasetDetail from '../components/DatasetDetail';

const mapStateToProps = (state, ownProps) => ({
  dataset: selectDataset(state.datasets, ownProps.match.params.id),
  datasets: getActiveDatasets(state.datasets, state.visibilityFilter),
  schema: state.schema
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
          dataset={props.dataset}
          schema={props.schema}
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
          onCreate={props.onCreate}
        />
      )}
    />
  </section>
);

DatasetsContainer.defaultProps = {
  dataset: {},
  datasets: [],
  schema: {}
};

DatasetsContainer.propTypes = {
  dataset: PropTypes.object, // eslint-disable-line
  datasets: PropTypes.arrayOf(PropTypes.object),
  onCreate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  schema: PropTypes.object.isRequired // eslint-disable-line
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatasetsContainer);
