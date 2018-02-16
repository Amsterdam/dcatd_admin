import React from 'react';
import PropTypes from 'prop-types';
// import { TextArea } from 'semantic-ui-react';

import './resources.scss';

const types = [
  'Data',
  'Documentatie',
  'Visualisatie',
  'Voorbeeldtoepassing'
];

const Resources = props => (
  <div className="form-group field resources">
    <div className="control-label">Resources</div>
    {types.map(type => (
      <div key={type}>{type}</div>
    ))}
    {console.log('props', props)}
    {console.log('props', props.schema.items)}
  </div>
);

// Resources.defaultProps = {
// };

Resources.propTypes = {
  schema: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};


export default Resources;
