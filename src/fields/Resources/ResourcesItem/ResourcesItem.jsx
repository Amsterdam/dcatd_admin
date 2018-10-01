import React from 'react';
import PropTypes from 'prop-types';

import filesize from 'filesize';
import dateFormat from '../../../definitions/date-format';

import './resources-item.scss';

function getFileType(mime, fieldSchema) {
  const type = fieldSchema.enum.indexOf(mime) > -1 ? fieldSchema.enumNames[fieldSchema.enum.indexOf(mime)] : 'Overig';
  return (
    <span className={`resources-item__file-type
      resources-item__file-type--${type.toLowerCase()}`}
    >{type}
    </span>
  );
}

const ResourcesItem = ({ resource, schemaProps }) => (
  <div className="resources-item">
    <div className="resources-item__modified">
      {dateFormat.formatDate(resource['dct:modified'])}</div>
    <div className="resources-item__file-size">
      {resource['dcat:byteSize'] > 0 ? filesize(resource['dcat:byteSize']) : ''}</div>
    <div className="resources-item__title">
      {resource['dct:title']}</div>
    <div className="resources-item__description">
      { (resource['ams:distributionType'] !== 'web') && getFileType(resource['dct:format'], schemaProps['dct:format'])}
      <span className="resources-item__description-text">{resource['dct:description'] || resource['dcat:accessURL']}</span>
    </div>
  </div>
);

ResourcesItem.defaultProps = {
  resource: {}
};

ResourcesItem.propTypes = {
  resource: PropTypes.object,
  schemaProps: PropTypes.object.isRequired
};

export default ResourcesItem;
