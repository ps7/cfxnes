import React from 'react';
import classNames from 'classnames';

const Message = ({children, className, onClose}) => (
  <div className={classNames('message', className)}>
    <div className="message-body">
      {children}
    </div>
    {onClose && <button className="message-close" onClick={onClose}>&times;</button>}
  </div>
);

Message.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  onClose: React.PropTypes.func,
};

Message.defaultProps = {
  children: null,
  className: null,
  onClose: null,
};

export default Message;
