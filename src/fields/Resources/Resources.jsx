import React from 'react';
import PropTypes from 'prop-types';
// import { TextArea } from 'semantic-ui-react';

import './resources.scss';

function handleAddResource(type) {
  console.log('handleAddResource', type);
}

const Resources = props => (
  <div className="resources">
    <div className="resources__title">Resources</div>
    {props.schema.items.properties['ams:resourceType'].enumNames.map(type => (
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
            Nog geen resources van dit type
          </div>
          {props.formData.filter(resource => resource['ams:resourceType'] === type).map(resource => (
            <div key={resource['dcat:accessURL']}>{resource['dct:title']} </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

Resources.defaultProps = {
  formData: []
};

Resources.propTypes = {
  formData: PropTypes.array,
  schema: PropTypes.object.isRequired
};

export default Resources;
