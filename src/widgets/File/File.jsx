import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getAccessToken } from '../../services/auth/auth';

import './file.scss';

const apiUrl = `https://${process.env.NODE_ENV !== 'production' ? 'acc.' : ''}api.data.amsterdam.nl/dcatd/files`;

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
  }

  componentWillReceiveProps(props) {
    this.setState({
      value: props.value
    });
  }

  processFile(files) {
    if (files.length !== 1) {
      return;
    }

    const formData = new FormData();
    formData.append('distribution', files[0]);

    const xhr = new XMLHttpRequest();

    xhr.onloadstart = () => {
      this.setState({
        status: 'busy',
        file: files[0].name
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
      if (xhr.readyState === 4 && (xhr.status === 201 || xhr.status === 200 || xhr.status === 0)) {
        this.setState({
          status: 'done',
          url: xhr.getResponseHeader('Location'),
          value: xhr.getResponseHeader('Location')
        });
      }
    };

    xhr.open('POST', apiUrl, true);
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
    this.props.onChange(value || undefined);
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
          onChange={event => this.handleChange(event.target.value)}
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
        {status !== 'idle' ?
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
          : ''}
      </div>
    );
  }
}

File.defaultProps = {
  file: '',
  label: '',
  placeholder: '',
  loaded: 0,
  status: 'idle',
  total: 0,
  url: '',
  value: ''
};

File.propTypes = {
  disabled: PropTypes.bool.isRequired,
  file: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  loaded: PropTypes.number,
  placeholder: PropTypes.string,
  readonly: PropTypes.bool.isRequired,
  required: PropTypes.bool.isRequired,
  status: PropTypes.string,
  total: PropTypes.number,
  url: PropTypes.string,
  value: PropTypes.string,

  onChange: PropTypes.func.isRequired
};

export default File;
