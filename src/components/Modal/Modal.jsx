import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal as SemanticModal } from 'semantic-ui-react';

class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: props.open
    };

    this.handleShowState = this.handleShowState.bind(this);
  }

  componentWillReceiveProps(props) {
    this.handleShowState(props.open);
  }

  handleShowState(state) {
    this.setState({
      open: state
    });
  }

  render() {
    const { open } = this.state;
    return (
      <SemanticModal
        open={open}
        trigger={this.props.trigger}
        size="tiny"
      >
        <SemanticModal.Header>Let op!</SemanticModal.Header>
        <SemanticModal.Content>
          {this.props.content}
        </SemanticModal.Content>
        <SemanticModal.Actions>
          <button
            onClick={() => {
              this.handleShowState(false);
              this.props.onProceed();
            }}
            className="dcatd-form-button dcatd-form-button-submit"
          >
            {this.props.actionLabel}
          </button>
          <button
            onClick={() => this.handleShowState(false)}
            className="dcatd-form-button"
          >
            Annuleren
          </button>
        </SemanticModal.Actions>
      </SemanticModal>
    );
  }
}

Modal.defaultProps = {
  content: 'Weet u het zeker?',
  actionLabel: 'OK',
  open: false,
  trigger: {},
  onProceed: () => {}
};

Modal.propTypes = {
  content: PropTypes.string,
  actionLabel: PropTypes.string,
  open: PropTypes.bool,
  trigger: PropTypes.object,
  onProceed: PropTypes.func
};


export default Modal;
