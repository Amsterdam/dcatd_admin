import React from 'react';
import PropTypes from 'prop-types';
// import { TextArea } from 'semantic-ui-react';

const Resources = props => (
  <div>

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
