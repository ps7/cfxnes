import React, {PropTypes} from 'react';
import Button from './Button';
import './Modal.css';

const Modal = ({children}) => (
  <div className="modal-overlay">
    <div className="modal">
      {children}
    </div>
  </div>
);

Modal.propTypes = {
  children: PropTypes.node,
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
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func,
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
  children: PropTypes.node,
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
  children: PropTypes.node,
};

Modal.Footer.defaultProps = {
  children: null,
};

export default Modal;
