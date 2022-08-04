import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import defer from 'lodash.defer';

import getNow from '../../services/get-now/get-now';
import api from '../../services/api/api';
import serverError from '../../services/server-error/server-error';
import { getAccessToken } from '../../services/auth/auth';

import './file.scss';

const mapDispatchToProps = (dispatch) => bindActionCreators({
  serverError
}, dispatch);

class File extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: props.file,
      loaded: props.loaded,
      status: props.status,
      total: props.total,
      value: props.value
    };

    this.processFile = this.processFile.bind(this);
    this.resetFile = this.resetFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);

    this.setUploadStatus = props.registry.formContext.setUploadStatus;
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.setState({
      value: props.value
    });

    if (!props.value) {
      this.resetFile();
    }
  }

  handleChange(value) {
    this.setState({
      value
    });
  }

  handleBlur() {
    if (this.state.value !== this.props.value) {
      const { formContext } = this.props.registry;
      if (formContext && formContext.setResourceSpecs) {
        this.props.registry.formContext.setResourceSpecs({
          'dcat:byteSize': 0,
          'dcat:accessURL': this.state.value
        });
      }
    }
  }

  handleValueChange(event) {
    const { value } = event.target;
    this.setState({
      value
    });
  }

  processFile(files) {
    if (files.length !== 1) {
      return;
    }

    const formData = new window.FormData();
    formData.append('distribution', files[0]);

    const xhr = new window.XMLHttpRequest();

    xhr.onloadstart = () => {
      this.setState({
        status: 'busy',
        file: files[0].name
      });

      this.setUploadStatus({
        uploadStatus: 'busy'
      });
    };

    xhr.upload.onprogress = (e) => {
      this.setState({
        loaded: e.loaded,
        total: e.total
      });
    };

    xhr.onload = () => {
      // upload success
      if (xhr.readyState === 4 && xhr.status === 201) {
        const location = xhr.getResponseHeader('Location');
        this.setState({
          status: 'done',
          value: location
        });

        const { formContext } = this.props.registry;
        if (formContext && formContext.setResourceSpecs) {
          formContext.setResourceSpecs({
            'dcat:byteSize': this.state.total,
            'dcat:mediaType': files[0].type,
            'ams:distributionType': 'file',
            'dct:modified': getNow().toISOString().split('T')[0],
            'foaf:isPrimaryTopicOf': {
              // eslint-disable-next-line react/prop-types
              ...formContext.formData['foaf:isPrimaryTopicOf']
            }
          });
        }

        this.props.onChange(location);

        defer(() => {
          this.handleChange(location);
        });
      } else {
        this.props.serverError(xhr);

        this.resetFile();
      }
    };

    xhr.open('POST', api.files, true);
    xhr.setRequestHeader('Authorization', `Bearer ${getAccessToken()}`);
    xhr.send(formData);
  }

  resetFile() {
    this.setState({
      file: '',
      loaded: 0,
      total: 0,
      status: 'idle'
    });

    this.setUploadStatus({
      uploadStatus: 'idle'
    });
  }

  calculateProgress() {
    if (this.state.status === 'done') {
      return 100;
    }
    return (this.state.total ? ((this.state.loaded / this.state.total) * 95).toFixed(0) : 0);
  }

  render() {
    const { file, status, value } = this.state;
    return (
      <div className="file">
        <input
          type="text"
          id={this.props.id}
          className="form-control file__url"
          label={this.props.label}
          disabled={this.props.disabled}
          placeholder={this.props.placeholder}
          readOnly={this.props.readonly}
          required={this.props.required}
          value={value}
          onChange={this.handleValueChange}
          onBlur={this.handleBlur}
        />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label
          htmlFor={`${this.props.id}-upload`}
          className={`
            file__upload-label
            ${status === 'idle' ? '' : 'file__upload--hidden'}
          `}
        >
          Selecteer bestand voor upload
        </label>
        <input
          type="file"
          className="file__upload file__upload--hidden"
          id={`${this.props.id}-upload`}
          disabled={this.props.disabled}
          onChange={(event) => this.processFile(event.target.files)}
        />
        {status !== 'idle'
          && (
          <div className="file__progress">
            <div
              className="file__progress-percentage"
              style={{ width: `${this.calculateProgress()}%` }}
            />
            <span className="file__progress-filename">{file}</span>
            {status === 'done'
              ? (
                // eslint-disable-next-line jsx-a11y/control-has-associated-label
                <button
                  type="button"
                  className="file__progress-close-button"
                  onClick={() => this.resetFile()}
                />
              ) : ''}
          </div>
          )}
      </div>
    );
  }
}

File.defaultProps = {
  disabled: false,
  file: '',
  label: '',
  placeholder: '',
  loaded: 0,
  readonly: false,
  registry: {},
  required: false,
  status: 'idle',
  total: 0,
  value: '',
  onChange: () => { },
  serverError: () => { }
};

File.propTypes = {
  disabled: PropTypes.bool,
  file: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  loaded: PropTypes.number,
  placeholder: PropTypes.string,
  readonly: PropTypes.bool,
  registry: PropTypes.shape({
    formContext: PropTypes.shape({
      setResourceSpecs: PropTypes.func.isRequired,
      setUploadStatus: PropTypes.func.isRequired
    })
  }),
  required: PropTypes.bool,
  status: PropTypes.string,
  total: PropTypes.number,
  value: PropTypes.string,
  onChange: PropTypes.func,
  serverError: PropTypes.func
};

export default connect(
  null,
  mapDispatchToProps
)(File);
