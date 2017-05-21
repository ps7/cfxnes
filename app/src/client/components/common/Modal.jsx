import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from './Button';
import './Modal.css';

const Modal = ({className, children, ...attrs}) => (
  <div className="modal-overlay">
    <div className={classNames('modal', className)} {...attrs}>
      {children}
    </div>
  </div>
);

Modal.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

Modal.defaultProps = {
  className: null,
  children: null,
};

Modal.Header = ({className, onClose, children, ...attrs}) => (
  <div className={classNames('modal-header', className)} {...attrs}>
    <h4 className="modal-title">{children}</h4>
    {onClose && <Button className="modal-close" onClick={onClose}>&times;</Button>}
  </div>
);

Modal.Header.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onClose: PropTypes.func,
};

Modal.Header.defaultProps = {
  className: null,
  onClose: null,
  children: null,
};

Modal.Body = ({className, children, ...attrs}) => (
  <div className={classNames('modal-body', className)} {...attrs}>
    {children}
  </div>
);

Modal.Body.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

Modal.Body.defaultProps = {
  className: null,
  children: null,
};

Modal.Footer = ({className, children, ...attrs}) => (
  <div className={classNames('modal-footer', className)} {...attrs}>
    {children}
  </div>
);

Modal.Footer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

Modal.Footer.defaultProps = {
  className: null,
  children: null,
};

export default Modal;
