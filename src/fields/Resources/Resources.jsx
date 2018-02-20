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

function handleAddResource(type) {
  console.log('handleAddResource', type);
}

const Resources = props => (
  <div className="resources">
    <div className="resources__title">Resources</div>
    {types.map(type => (
      <div className="resources-type" key={type}>
        <div className="resources-type-header">
          <span className="resources-type-header__title">{type}</span>
          <button
            onClick={() => handleAddResource(type)}
            className="resources-type-header__button"
          >+</button>
        </div>
        <div className="resources-type-content">
          <div className="resources-type-content--no-resources">
            Nog geen resoucres van dit type
          </div>
        </div>
      </div>
    ))}
    {console.log('props', props)}
    {console.log('props.schema.items', props.schema.items)}
  </div>
);

// Resources.defaultProps = {
// };

Resources.propTypes = {
  schema: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};


export default Resources;
