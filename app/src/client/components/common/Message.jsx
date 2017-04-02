import React, {PropTypes} from 'react';
import classNames from 'classnames';
import './Message.css';

const Message = ({children, className, onClose}) => (
  <div className={classNames('message', className)}>
    <div className="message-body">
      {children}
    </div>
    {onClose && <button className="message-close" onClick={onClose}>&times;</button>}
  </div>
);

Message.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClose: PropTypes.func,
};

Message.defaultProps = {
  children: null,
  className: null,
  onClose: null,
};

export default Message;
