import React from 'react';
import PropTypes from 'prop-types';

import { dateFormat } from '../../definitions/localization';

import './resources.scss';

const filetypeMap = {
  'application/json': 'json',
  'application/octet-stream': 'overig'
};

function handleAddResource(type) {
  console.log('handleAddResource', type);
}

function getFileType(mime) {
  const type = mime.split('/')[1];
  console.log(mime, type);
  return (
    <span className={`resources-type-content-item-file-type
      resources-type-content-item-file-type-${type}`}
    >{filetypeMap[mime]}
    </span>
  );
}

const Resources = props => (
  <div className="resources">
    <div className="resources-title">Resources</div>
    {props.schema.items.properties['ams:resourceType'].enumNames.map((type, index) => (
      <div className="resources-type" key={type}>
        <div className="resources-type-header">
          <span className="resources-type-header-title">{type}</span>
          <button
            onClick={() => handleAddResource(type)}
            className="resources-button"
          />
        </div>
        <div className="resources-type-content">
          {props.formData.filter(resource => resource['ams:resourceType'] === props.schema.items.properties['ams:resourceType'].enum[index]).map(resource => (
            <div
              className="resources-type-content-item"
              key={resource['dcat:accessURL']}
            >
              <div className="resources-type-content-item-info">
                <div className="resources-type-content-item-updated">
                  {dateFormat.formatDate(resource['foaf:isPrimaryTopicOf']['dct:issued'])}</div>
                <div className="resources-type-content-item-size">
                  {resource['dcat:byteSize'] > 0 ? (resource['dcat:byteSize'] || 0) / 1024 : ''} kb</div>
                <div className="resources-type-content-item-title">
                  {resource['dct:title']}</div>
                <div className="resources-type-content-item-description">
                  {getFileType(resource['dct:format'])}{resource['dct:description']}</div>
              </div>
              <button
                onClick={() => handleAddResource(type)}
                className="resources-button"
              />
            </div>
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
