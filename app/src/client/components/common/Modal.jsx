import React from 'react';
import Button from './Button';

const Modal = ({children}) => (
  <div className="modal-overlay">
    <div className="modal">
      {children}
    </div>
  </div>
);

Modal.propTypes = {
  children: React.PropTypes.node,
};

Modal.defaultProps = {
  children: null,
};

Modal.Header = ({title, onClose}) => (
  <div className="modal-header">
    <h4 className="modal-title">{title}</h4>
    {onClose && <Button caption="&times;" onClick={onClose}/>}
  </div>
);

Modal.Header.propTypes = {
  title: React.PropTypes.string.isRequired,
  onClose: React.PropTypes.func,
};

Modal.Header.defaultProps = {
  onClose: null,
};

Modal.Body = ({children}) => (
  <div className="modal-body">
    {children}
  </div>
);

Modal.Body.propTypes = {
  children: React.PropTypes.node,
};

Modal.Body.defaultProps = {
  children: null,
};

Modal.Footer = ({children}) => (
  <div className="modal-footer">
    {children}
  </div>
);

Modal.Footer.propTypes = {
  children: React.PropTypes.node,
};

Modal.Footer.defaultProps = {
  children: null,
};

export default Modal;
