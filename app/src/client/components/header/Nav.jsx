import React, {PropTypes} from 'react';
import classNames from 'classnames';
import {Link} from 'react-router';
import {Icon} from '../common';

const Nav = ({type, children}) => {
  const className = classNames('navigation', type && `navigation-${type}`);
  return <nav className={className}>{children}</nav>;
};

Nav.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Nav.defaultProps = {
  type: null,
};

Nav.Link = ({to, label, icon}) => (
  <Link to={to} className="navigation-link" activeClassName="active">
    <Icon name={icon}/> {label}
  </Link>
);

Nav.Link.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Nav;
