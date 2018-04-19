import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const DatasetList = ({ datasets }) => (
  <section>
    {/* Use classes on a `<div>` instead of `<Button>` for Firefox support */}
    <div className="ui primary button">
      <NavLink
        style={{ color: '#FFF' }}
        to="/datasets/_"
      >
        Dataset aanmaken
      </NavLink>
    </div>
    <table className="ui celled table">
      <thead>
        <tr>
          <th>Dataset</th>
        </tr>
      </thead>
      <tbody>
        {datasets.map(dataset => (
          <tr key={dataset.id}>
            <td>
              <NavLink
                to={`/datasets/${dataset.id}`}
                style={{ display: 'block' }}
              >
                {dataset.title}
              </NavLink>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
);

DatasetList.propTypes = {
  datasets: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default DatasetList;
