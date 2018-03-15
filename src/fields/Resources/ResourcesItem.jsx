import React from 'react';
import PropTypes from 'prop-types';

import filesize from 'filesize';
import { dateFormat } from '../../definitions/localization';

import './resources-item.scss';

function getFileType(mime, fieldSchema) {
  const type = fieldSchema.enumNames[fieldSchema.enum.indexOf(mime)];
  return (
    <span className={`resources-item__file-type
      resources-item__file-type--${type}`}
    >{type || 'overig'}
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
      {getFileType(resource['dct:format'], schemaProps['dct:format'])}
      {resource['dct:description']}</div>
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
