import React, {PropTypes} from 'react';
import classNames from 'classnames';

const Toolbar = ({type, children}) => {
  const className = classNames('toolbar', type && `toolbar-${type}`);
  return <div className={className}>{children}</div>;
};

Toolbar.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Toolbar.defaultProps = {
  type: null,
};

export default Toolbar;
