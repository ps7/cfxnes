import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Message.css';

const INFO = 'info';
const ERROR = 'error';

const Message = ({className, type, onClose, children, ...attrs}) => (
  <div className={classNames('message', type, className)} {...attrs}>
    <div className="message-body">
      {children}
    </div>
    {onClose && <button className="message-close" onClick={onClose}>&times;</button>}
  </div>
);

Message.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf([INFO, ERROR]),
  onClose: PropTypes.func,
  children: PropTypes.node,
};

Message.defaultProps = {
  className: null,
  type: INFO,
  onClose: null,
  children: null,
};

export default Message;
