import React, {PropTypes} from 'react';
import classNames from 'classnames';
import './Message.css';

const INFO = 'info';
const ERROR = 'error';

const Message = ({type, className, onClose, children}) => (
  <div className={classNames('message', type, className)}>
    <div className="message-body">
      {children}
    </div>
    {onClose && <button className="message-close" onClick={onClose}>&times;</button>}
  </div>
);

Message.propTypes = {
  type: PropTypes.oneOf([INFO, ERROR]),
  className: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.node,
};

Message.defaultProps = {
  type: INFO,
  className: null,
  onClose: null,
  children: null,
};

export default Message;
