import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import defer from 'lodash.defer';

import api from '../../services/api/api';
import serverError from '../../services/server-error/server-error';
import { getAccessToken } from '../../services/auth/auth';

import './file.scss';

const mapDispatchToProps = dispatch => bindActionCreators({
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
      url: props.url,
      value: props.value
    };

    this.processFile = this.processFile.bind(this);
    this.resetFile = this.resetFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);

    this.setResourceSpecs = props.registry.formContext.setResourceSpecs;
    this.setUploadStatus = props.registry.formContext.setUploadStatus;
  }

  componentWillReceiveProps(props) {
    this.setState({
      value: props.value
    });

    if (!props.value) {
      this.resetFile();
    }
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
      if (xhr.readyState === 4 && xhr.status === 201 && xhr.statusText === 'Created') {
        const location = xhr.getResponseHeader('Location');
        this.setState({
          status: 'done',
          url: location,
          value: location
        });

        if (this.props.registry.formContext && this.props.registry.formContext.setResourceSpecs) {
          this.props.registry.formContext.setResourceSpecs({
            'dcat:byteSize': this.state.total,
            'dcat:mediaType': files[0].type,
            'ams:distributionType': 'file'
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
      status: 'idle',
      url: ''
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

  handleChange(value) {
    this.setState({
      value
    });
  }

  handleBlur() {
    if (this.state.value !== this.props.value) {
      if (this.props.registry.formContext && this.props.registry.formContext.setResourceSpecs) {
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
        <label
          htmlFor={`${this.props.id}-upload`}
          className={`
            file__upload-label
            ${status === 'idle' ? '' : 'file__upload--hidden'}
          `}
        >Selecteer bestand voor upload</label>
        <input
          type="file"
          className="file__upload file__upload--hidden"
          id={`${this.props.id}-upload`}
          disabled={this.props.disabled}

          onChange={event => this.processFile(event.target.files)}
        />
        {status !== 'idle' &&
          <div className="file__progress">
            <div
              className="file__progress-percentage"
              style={{ width: `${this.calculateProgress()}%` }}
            />
            <span className="file__progress-filename">{file}</span>
            {status === 'done' ?
              <button
                className="file__progress-close-button"
                onClick={() => this.resetFile()}
              /> : ''}
          </div>
        }
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
  url: '',
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
  }).isRequired,
  required: PropTypes.bool,
  status: PropTypes.string,
  total: PropTypes.number,
  url: PropTypes.string,
  value: PropTypes.string,

  onChange: PropTypes.func,
  serverError: PropTypes.func
};

export default connect(
  null,
  mapDispatchToProps
)(File);
