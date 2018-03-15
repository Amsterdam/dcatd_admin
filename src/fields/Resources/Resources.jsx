import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ResourcesItem from './ResourcesItem';

import { getResource } from '../../actions/resource';

import './resources.scss';

const mapDispatchToProps = dispatch => bindActionCreators({
  getResource
}, dispatch);

class Resources extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resource: props.resource
    };

    this.handleAddResource = this.handleAddResource.bind(this);
    this.handleEditResource = this.handleEditResource.bind(this);
  }

  handleAddResource(type) {
    // this;
    console.log('handleAddResource', type, this);
  }

  handleEditResource(resource) {
    console.log('handleEditResource', resource, this);
    // this.props.getResource(resource);
  }

  render() {
    console.log('render');
    return (
      <div className="resources">
        {this.props.schema.items.properties['ams:resourceType'].enumNames.map((type, index) => (
          <div className="resources-type" key={type}>
            <div className="resources-type__header">
              <span className="resources-type__header-title">{type}</span>
              <button
                type="button"
                onClick={() => this.handleAddResource(type)}
                className="resources-button resources-button-new"
              />
            </div>
            <div className="resources-type__content">
              {this.props.formData.filter(resource => resource['ams:resourceType'] === this.props.schema.items.properties['ams:resourceType'].enum[index]).map(resource => (
                <div
                  className="resources-type__content-item"
                  key={resource['dcat:accessURL']}
                >
                  <ResourcesItem
                    resource={resource}
                    schemaProps={this.props.schema.items.properties}
                  />
                  <button
                    type="button"
                    onClick={() => this.handleEditResource(resource)}
                    className="resources-button resources-button-edit"
                  />
                </div>
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
  resource: {}
};

Resources.propTypes = {
  formData: PropTypes.array,
  resource: PropTypes.object,
  schema: PropTypes.object.isRequired

  // getResource: PropTypes.func.isRequired
};

export default connect(
  mapDispatchToProps
)(Resources);
