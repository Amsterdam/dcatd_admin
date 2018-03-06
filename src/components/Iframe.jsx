import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Iframe extends Component {
  componentDidMount() {
    ReactDOM.render(this.props.children, ReactDOM.findDOMNode(this).contentDocument.body); // eslint-disable-line
  }

  componentDidUpdate() {
    ReactDOM.render(this.props.children, ReactDOM.findDOMNode(this).contentDocument.body); // eslint-disable-line
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this).contentDocument.body); // eslint-disable-line
  }

  render() {
    return (
      <iframe
        title="yoyo"
        width="100%"
        style={{ backgroundColor: 'yellow' }}
      />
    );
  }
}

Iframe.defaultProps = {
  children: {}
};


Iframe.propTypes = {
  children: PropTypes.object
};

export default Iframe;
