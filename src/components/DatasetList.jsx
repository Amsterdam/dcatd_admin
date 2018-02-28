import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

const DatasetList = ({ datasets, onRemove }) => (
  <section>
    {/* Use classes on a `<div>` instead of `<Button>` for Firefox support */}
    <div className="ui primary button">
      <NavLink
        style={{ color: '#FFF' }}
        to="/dcatd_admin/datasets/new"
      >
        Dataset aanmaken
      </NavLink>
    </div>
    <table className="ui celled table">
      <thead>
        <tr>
          <th>E-mailadres</th>
          <th>Rollen</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {datasets.map(dataset => (
          <tr key={dataset.id}>
            <td>
              <NavLink
                to={`/dcatd_admin/datasets/${dataset.id}`}
                style={{ display: 'block' }}
              >
                {dataset.title}
              </NavLink>
            </td>
            <td>
              yo
            </td>
            <td>
              <Button
                compact
                onClick={() => onRemove(dataset)}
              >
                Verwijderen
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
);

DatasetList.defaultProps = {
  onRemove: () => {}
};

DatasetList.propTypes = {
  datasets: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRemove: PropTypes.func
};

export default DatasetList;
