import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

class DatasetList extends React.Component {
  componentDidMount() {
    this.props.onFetchDatasets();
  }

  render() {
    const { datasets } = this.props;
    return (
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
            {datasets && datasets.map((dataset) => (
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
  }
}

DatasetList.propTypes = {
  datasets: PropTypes.arrayOf(PropTypes.object).isRequired,
  onFetchDatasets: PropTypes.func.isRequired
};

export default DatasetList;
