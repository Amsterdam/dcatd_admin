import React from 'react';
import PropTypes from 'prop-types';

import filesize from 'filesize';
import dateFormat from '../../definitions/date';

import './resources-item.scss';

function getFileType(mime, fieldSchema) {
  const type = fieldSchema.enumNames[fieldSchema.enum.indexOf(mime)].toLowerCase();
  return (
    <span className={`resources-item__file-type
      resources-item__file-type--${type}`}
    >{type || 'overig'}
    </span>
  );
}

const ResourcesItem = ({ resource, schemaProps }) => (
  <a className="resources-item" href={resource['dcat:accessURL']} target="_blank">
    <div className="resources-item__modified">
      {dateFormat.formatDate(resource['dct:modified'])}</div>
    <div className="resources-item__file-size">
      {resource['dcat:byteSize'] > 0 ? filesize(resource['dcat:byteSize']) : ''}</div>
    <div className="resources-item__title">
      {resource['dct:title']}</div>
    <div className="resources-item__description">
      {getFileType(resource['dct:format'], schemaProps['dct:format'])}
      {resource['dct:description']}</div>
  </a>
);

ResourcesItem.defaultProps = {
  resource: {}
};

ResourcesItem.propTypes = {
  resource: PropTypes.object,
  schemaProps: PropTypes.object.isRequired
};

export default ResourcesItem;
