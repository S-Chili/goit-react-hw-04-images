import React from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const Modal = ({ onClose, children }) => (
  <div className={css.overlay} onClick={onClose}>
    <div className={css.modal} onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  </div>
);
export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};