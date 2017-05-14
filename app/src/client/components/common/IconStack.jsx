import React, {PropTypes} from 'react';
import classNames from 'classnames';

const IconStack = ({className, size, children, ...attrs}) => (
  <span className={classNames('fa-stack', size && `fa-${size}`, className)} {...attrs}>
    {children}
  </span>
);

IconStack.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(['lg', '1x', '2x', '3x', '4x', '5x']),
  children: PropTypes.node,
};

IconStack.defaultProps = {
  className: null,
  size: null,
  children: null,
};

export default IconStack;
