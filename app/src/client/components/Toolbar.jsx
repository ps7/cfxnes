import React from 'react';
import classNames from 'classnames';

const Toolbar = ({type, children}) => {
  const className = classNames('toolbar', type && `toolbar-${type}`);
  return <div className={className}>{children}</div>;
};

Toolbar.propTypes = {
  type: React.PropTypes.string,
  children: React.PropTypes.node.isRequired,
};

Toolbar.defaultProps = {
  type: null,
};

export default Toolbar;
