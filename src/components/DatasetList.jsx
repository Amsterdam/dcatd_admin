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
        to="/datasets/new"
      >
        Dataset koppelen
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
          <tr key={dataset.emailAddress}>
            <td>
              <NavLink
                to={`/datasets/${dataset.emailAddress}`}
                style={{ display: 'block' }}
              >
                {dataset.emailAddress}
              </NavLink>
            </td>
            <td>
              {dataset.roles.map(role => role.title).sort().join(', ')}
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
