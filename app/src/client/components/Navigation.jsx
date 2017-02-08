import React from 'react';
import classNames from 'classnames';

const Navigation = ({type, children}) => {
  const className = classNames('navigation', type && `navigation-${type}`);
  return <nav className={className}>{children}</nav>;
};

Navigation.propTypes = {
  type: React.PropTypes.string,
  children: React.PropTypes.node.isRequired,
};

Navigation.defaultProps = {
  type: null,
};

export default Navigation;
