import React from 'react';
import PropTypes from 'prop-types';
import { Modal as SemanticModal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setModal } from '../../actions/modal';

import './modal.scss';

const mapStateToProps = state => ({
  modal: state.modal
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setModal
}, dispatch);

const Modal = props => (
  <SemanticModal
    open={props.modal.open}
    size="tiny"
  >
    <SemanticModal.Header>Let op!</SemanticModal.Header>
    <SemanticModal.Content>
      {props.modal.content}
    </SemanticModal.Content>
    <SemanticModal.Actions>
      <button
        onClick={() => {
          props.setModal({ open: false });
          props.modal.onProceed();
        }}
        className="dcatd-form-button dcatd-form-button-submit"
      >
        {props.modal.actionLabel}
      </button>
      <button
        onClick={() => props.setModal({ open: false })}
        className="dcatd-form-button"
      >
        Annuleren
      </button>
    </SemanticModal.Actions>
  </SemanticModal>
);

Modal.defaultProps = {
  content: 'Weet u het zeker?',
  actionLabel: 'OK',
  open: false,

  onProceed: () => {}
};

Modal.propTypes = {
  modal: PropTypes.object.isRequired,
  setModal: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
