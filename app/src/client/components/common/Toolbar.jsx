import React, {PropTypes} from 'react';
import classNames from 'classnames';

const Toolbar = ({className, children, ...attrs}) => {
  return <div className={classNames('toolbar', className)} {...attrs}>
    {children}
  </div>;
};

Toolbar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

Toolbar.defaultProps = {
  className: null,
  children: null,
};

export default Toolbar;
