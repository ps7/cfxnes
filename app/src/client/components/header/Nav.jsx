import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {Icon} from '../common';
import './Nav.css';

const Nav = ({children, ...attrs}) => {
  return <nav className="nav" {...attrs}>{children}</nav>;
};

Nav.propTypes = {
  children: PropTypes.node,
};

Nav.defaultProps = {
  children: null,
};

Nav.Link = ({to, label, icon}) => (
  <NavLink to={to} className="nav-link">
    <Icon name={icon}/> {label}
  </NavLink>
);

Nav.Link.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Nav;
