import React from 'react';
import PropTypes from 'prop-types';
import { Modal as SemanticModal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setModal } from '../../actions/modal/modal';

import './modal.scss';

const mapStateToProps = state => ({
  modal: state.modal
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setModal
}, dispatch);

const modalHeader = {
  AUTH_ERROR: 'Niet bevoegd',
  SERVER_ERROR: 'Er ging iets mis'
};

const modalContent = {
  AUTH_ERROR: `
    <span>
      <p>U bent niet bevoegd tot het beschikbaar maken van een dataset.</p>
    </span>
  `,
  SERVER_ERROR: `
    <span>
      <p>U bent niet (meer) bevoegd tot het uitvoeren van deze actie.</p>
      <p>Wellicht komt dit doordat:
      <ol>
        <li>Uw sessie is verlopen. Deze duurt maximaal 10 uur.</li>
        <li>U niet bevoegd bent om datasets te beheren.</li>
      </ol>
      </p>
    </span>
  `
};

const Modal = props => (
  <SemanticModal
    open={props.modal.open}
    size="tiny"
  >
    <SemanticModal.Header>
      { modalHeader[props.modal.content] || 'Let op!' }
    </SemanticModal.Header>
    <SemanticModal.Content>
      <div dangerouslySetInnerHTML={{
        __html: modalContent[props.modal.content] || props.modal.content
      }}
      />
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
      {props.modal.cancelLabel ?
        <button
          onClick={() => props.setModal({ open: false })}
          className="dcatd-form-button dcatd-form-button-cancel"
        >
          {props.modal.cancelLabel}
        </button>
        : ''}
    </SemanticModal.Actions>
  </SemanticModal>
);

Modal.defaultProps = {
  open: false,
  modal: {
    content: 'Weet u het zeker?',
    actionLabel: 'OK',
    cancelLabel: 'Annuleren',
    open: false,
    onProceed: () => {}
  },

  setModal: () => {}
};

Modal.propTypes = {
  modal: PropTypes.object,
  setModal: PropTypes.func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
