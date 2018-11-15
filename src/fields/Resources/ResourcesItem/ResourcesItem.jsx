import React from 'react';
import PropTypes from 'prop-types';

import filesize from 'filesize';
import dateFormat from '../../../definitions/date-format';

import './resources-item.scss';

const getFileType = (mime, fieldSchema) => {
  return fieldSchema.enum.indexOf(mime) > -1 ? fieldSchema.enumNames[fieldSchema.enum.indexOf(mime)] : 'Anders';
};

const ResourcesItem = ({ resource, schemaProps }) => {
  let fileType;
  if (resource['ams:distributionType'] === 'api') {
    fileType = getFileType(resource['ams:serviceType'], schemaProps['ams:serviceType']);
  } else if (resource['ams:distributionType'] === 'file') {
    fileType = getFileType(resource['dcat:mediaType'], schemaProps['dcat:mediaType']);
  } else {
    fileType = getFileType(resource['ams:distributionType'], schemaProps['ams:distributionType']);
  }

  return (<div className="resources-item">
    <div className="resources-item__modified">
      {dateFormat.formatDate(resource['dct:modified'])}</div>
    <div className="resources-item__file-size">
      {resource['dcat:byteSize'] > 0 ? filesize(resource['dcat:byteSize']) : ''}</div>
    <div className="resources-item__title">
      {resource['dct:title']}</div>
    <div className="resources-item__description">
      <span className={`resources-item__file-type resources-item__file-type--${fileType.toLowerCase()}`}>
        {fileType}
      </span>
      <span className="resources-item__description-text">{resource['dct:description'] || resource['ams:purl']}</span>
    </div>
  </div>);
};

ResourcesItem.defaultProps = {
  resource: {}
};

ResourcesItem.propTypes = {
  resource: PropTypes.object,
  schemaProps: PropTypes.object.isRequired
};

export default ResourcesItem;
