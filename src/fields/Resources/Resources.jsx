import React, { Component } from 'react';
import PropTypes from 'prop-types';

import getNow from '../../services/get-now/get-now';
import ResourcesItem from './ResourcesItem/ResourcesItem';

import './resources.scss';

class Resources extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resources: props.formData
    };

    this.handleAddResource = this.handleAddResource.bind(this);
    this.handleEditResource = this.handleEditResource.bind(this);
    this.getResourceTypeSchema = this.getResourceTypeSchema.bind(this);
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.setState({
      resources: props.formData
    });
  }

  handleAddResource(type) {
    if (this.props.formContext && this.props.formContext.handleSetResource) {
      const today = getNow().toISOString().split('T')[0];
      this.props.formContext.handleSetResource({
        'ams:classification': 'public',
        'ams:resourceType': type,
        'dct:modified': today,
        'foaf:isPrimaryTopicOf': {
          'dct:issued': today,
          'dct:modified': today
        }
      });
    }
  }

  handleEditResource(event, resource) {
    event.preventDefault();

    if (this.props.formContext && this.props.formContext.handleSetResource) {
      this.props.formContext.handleSetResource(resource);
    }
  }

  getResourceTypeSchema() {
    return this.props.schema.items.properties['ams:resourceType'];
  }

  render() {
    const { resources } = this.state;

    return (
      <div className="resources">
        {this.props.schema.items.properties['ams:resourceType'].enumNames.map((type, index) => (
          <div className="resources-type" key={this.getResourceTypeSchema().enum[index]}>
            <div className="resources-type__header">
              <span className="resources-type__header-title">{type}</span>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                onClick={() => this.handleAddResource(this.getResourceTypeSchema().enum[index])}
                className="resources-button resources-button-new"
              />
            </div>
            <div className="resources-type__content">
              {resources.filter((resource) => resource['ams:resourceType'] === this.getResourceTypeSchema().enum[index]).map((resource) => (
                <a
                  href={resource['ams:purl']}
                  target="_blank"
                  rel="noreferrer"
                  className="resources-type__content-item"
                  key={resource['@id']}
                >
                  <ResourcesItem
                    resource={resource}
                    schemaProps={this.props.schema.items.properties}
                  />
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button
                    type="button"
                    onClick={(event) => this.handleEditResource(event, resource)}
                    className="resources-button resources-button-edit"
                  />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

Resources.defaultProps = {
  formData: [],
  formContext: {}
};

Resources.propTypes = {
  formData: PropTypes.array,
  schema: PropTypes.object.isRequired,
  formContext: PropTypes.object
};

export default Resources;
