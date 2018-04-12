import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import defer from 'lodash.defer';

import { setModal } from '../../actions/modal';
import { getAccessToken } from '../../services/auth/auth';

import './file.scss';

const apiUrl = `https://${process.env.NODE_ENV !== 'production' ? 'acc.' : ''}api.data.amsterdam.nl/dcatd/files`;

const mapDispatchToProps = dispatch => bindActionCreators({
  setModal
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

    const formData = new FormData();
    formData.append('distribution', files[0]);

    const xhr = new XMLHttpRequest();

    xhr.onloadstart = () => {
      this.setState({
        status: 'busy',
        file: files[0].name
      });

      if (this.props.registry.formContext && this.props.registry.formContext.setUploadStatus) {
        this.props.registry.formContext.setUploadStatus('busy');
      }
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
            'dct:format': files[0].type,
            'ams:distributionType': 'file'
          });
        }

        this.props.onChange(location);

        defer(() => {
          this.handleChange(location);
        });
      } else {
        this.props.setModal({
          actionLabel: 'OK',
          content: `Er is iets fout gegaan bij de upload. Probeer opnieuw in te loggen.
            [${xhr.responseText}]`,
          open: true,
          onProceed: () => {}
        });

        this.resetFile();
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

    if (this.props.registry.formContext && this.props.registry.formContext.setUploadStatus) {
      this.props.registry.formContext.setUploadStatus('idle');
    }
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
  registry: {},
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
  registry: PropTypes.object,
  required: PropTypes.bool.isRequired,
  status: PropTypes.string,
  total: PropTypes.number,
  url: PropTypes.string,
  value: PropTypes.string,

  onChange: PropTypes.func.isRequired,
  setModal: PropTypes.func.isRequired
};

export default connect(
  null,
  mapDispatchToProps
)(File);
